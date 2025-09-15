"use client"

import { useTranslations } from "next-intl"
import { milestones } from "@/constants/milestones"
import { useEffect, useState } from "react"
import NavigationBar from "@/components/layout/navigationBars/navigationBarWrapper"
import { NumberCompactFormat } from "@/lib/format"
function Milestones({ views_count }: { views_count: number }) {
    let t = useTranslations('keyword')
    let [Milestones, setMilestones] = useState({
        nextMilestonesIndex: 0,
        nextMilestone: 5,
        nextMilestones: [5, 10, 20, 25, 50]
    })

    let genrateMilestones = (views_count: number) => {
        let nextMilestone = milestones.find(el => (el * 1000) > views_count) || 0
        let nextMilestonesIndex = milestones.findIndex(el => (el * 1000) > views_count)
        let nextMilestones = milestones.filter(el => el > nextMilestone)
        nextMilestone=milestones[nextMilestonesIndex]*1000-views_count
        setMilestones({
            nextMilestone,
            nextMilestonesIndex,
            nextMilestones
        });


    }
    useEffect(() => genrateMilestones(views_count), [])
    useEffect(() => console.log(Milestones), [Milestones])

     console.log(views_count);
     
    return (
        <section className="border-[1px] border-zinc-300 border-solid p-5 rounded-2xl">
            <h1 className="title-1">{t('milestones')}</h1>
            <NavigationBar>
                <section className="w-[90vw] flex   gap-3">
                    <div className=" flex-1 border-inherit border-solid border-[1px] p-7 rounded-2xl space-y-3">
                        <h3 className="text-zinc-500">{t('milestones_unlocked')}</h3>
                        <h1 className="text-3xl font-bold">{Milestones?.nextMilestonesIndex}/{milestones.length}</h1>
                    </div>
                    <div className="flex-1 border-inherit border-solid border-[1px] p-7 rounded-2xl space-y-3">
                        <h3 className="text-zinc-500">{t('total_views')}</h3>
                        <h1 className="text-3xl font-bold">{NumberCompactFormat(views_count)}</h1>
                    </div>
                    <div className=" flex-1 border-inherit border-solid border-[1px] p-7 rounded-2xl space-y-3">
                        <h3 className="text-zinc-500">{t('next_milestone')}</h3>
                        <h1 className="text-3xl font-bold">{NumberCompactFormat(Milestones.nextMilestone)}</h1>
                    </div>
                </section>
            </NavigationBar>


        </section>
    )
}

export default Milestones