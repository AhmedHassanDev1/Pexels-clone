import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDTO } from "src/Auth/Auth.dto";
import { User } from "src/schemas/user.schema";
import { EditeProfileDTO, UserDto } from "./user.dto";
import { UploadService } from "src/upload/upload.services";
import { ImageProcessingServices } from "src/services/imageProcessing.services";
import { Follow } from "src/schemas/interactions/follow.schema";
import { plainToInstance } from "class-transformer";


@Injectable()
export class UserServices {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Follow.name) private FollowersModel: Model<Follow>,
    private Uploader: UploadService,
    private imageProcesser: ImageProcessingServices,

  ) { }

  async createUser(user: CreateUserDTO) {
    let isExists = await this.UserModel.exists({ email: user.email })
    let full_name=user.first_name+user.last_name || ' '
    if (!isExists) {
      let newUser = new this.UserModel({...user,full_name})
      await newUser.save()
      return newUser
    } else {
      throw new ConflictException("Email has already been taken")
    }
  }
  async getUserById(id: string): Promise<UserDto> {
    let user = await this.UserModel.findById(id).lean()
    return plainToInstance(UserDto, user)
  }

  async isExists(email: string) {
    let isExists = await this.UserModel.exists({ email: email })
    return !!isExists
  }

  async getUserByEmail(email: string): Promise<User> {
    let user = await this.UserModel.findOne({ email })
    if (!user) {
      throw new NotFoundException('not found this user')
    }
    return user
  }

  async editeProfile(user_id: string, editeProfileDTO: EditeProfileDTO) {
    let full_name=editeProfileDTO.first_name+editeProfileDTO.last_name || ' '

    let user = await this.UserModel.findByIdAndUpdate(user_id, { $set: {...editeProfileDTO,full_name} }, { new: true })

    if (!user) throw new NotFoundException('User not found');

    return user
  }
  async UpdateProfileImage(id: string, Image: Buffer) {
    let processedBuffer = await this.imageProcesser.resizeImage(256, 256, Image)
    let source = await this.Uploader.uploadSingleFile(processedBuffer)
    let profile_image = {
      public_id: source.public_id,
      url: source.secure_url
    }

    let user: User = await this.UserModel.findById(id)
    if (!user) throw new NotFoundException('not found this user')
    await this.UserModel.updateOne({ _id: id }, { $set: { profile_image } })

    if (user.profile_image) {
      await this.Uploader.DeleteFileByPublicId(user.profile_image.public_id)
    }
    return source
  }

  async getUserStatistics(id: string) {
    let statistics = await this.UserModel.findById(id, {
      statistics: 1
    })
    return statistics
  }

  async getLeaderboard(userId: string, limit = 10, page = 1) {
    const leaderBoard = await this.UserModel
      .find({ _id: { $ne: userId } })
      .select("first_name last_name profile_image statistics")
      .sort({
        "statistics.views_count": -1,
        "statistics.followers_count": -1,
        "statistics.likes_count": -1,
        "statistics.assets_count": -1
      })
      .limit(limit)
      .skip((page - 1) * limit);

    return leaderBoard;
  }

  async isFollow(followerId: string, userId: string): Promise<boolean> {
    let isFollow = await this.FollowersModel.findOne({
      follower: followerId,
      user: userId
    })
    return !!isFollow
  }

  async follow(followerId: string, userId: string) {

    await this.FollowersModel.updateOne(
      { follower: followerId, user: userId },
      { $setOnInsert: { follower: followerId, user: userId } },
      { upsert: true }
    );

    await this.UserModel.bulkWrite([
      {
        updateOne: {
          filter: { _id: userId },
          update: {
            $addToSet: { followers: followerId },
            $inc: { "statistics.followers_count": 1 }
          }
        }
      },
      {
        updateOne: {
          filter: { _id: followerId },
          update: {
            $addToSet: { followings: userId },
            $inc: { "statistics.following_count": 1 }
          }
        }
      }
    ]);
  }


  async unfollow(followerId: string, userId: string) {
    await this.FollowersModel.deleteOne({ follower: followerId, user: userId });

    await this.UserModel.bulkWrite([
      {
        updateOne: {
          filter: { _id: userId },
          update: {
            $pull: { followers: followerId },
            $inc: { "statistics.followers_count": -1 }
          }
        }
      },
      {
        updateOne: {
          filter: { _id: followerId },
          update: {
            $pull: { followings: userId },
            $inc: { "statistics.following_count": -1 }
          }
        }
      }
    ]);
  }

} 