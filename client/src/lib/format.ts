
export let NumberCompactFormat = (number: number | undefined = 0, local: string = 'en'): string => {
    return new Intl.NumberFormat(local, {
        notation: "compact",

    }).format(number)

}