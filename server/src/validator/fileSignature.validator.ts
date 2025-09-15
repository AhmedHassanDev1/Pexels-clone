import { FileValidator } from "@nestjs/common";
// import { IFile } from "@nestjs/common/pipes/file/interfaces";
import magicBytes from "magic-bytes.js"

export class FileSignatureValidator extends FileValidator {
    isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
        let fileSignatures = magicBytes(file.buffer).map(el => el.mime)
        let fileMemeType = file.mimetype
        if (!fileSignatures.includes(fileMemeType) || !fileSignatures.length) {
            return false
        }
        return true
    }
    buildErrorMessage(file: any): string {
        return 'Unacceptable file type'
    }

}