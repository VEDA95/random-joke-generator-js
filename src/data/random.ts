
export function getRandomId(): number {
    return Math.random() * 1368;
}

export function getRandomCategory(): string {
    const categoryArr: Array<string> = ['Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];
    const randomIndex: number = Math.random() * (categoryArr.length - 1);

    return categoryArr[randomIndex];
}