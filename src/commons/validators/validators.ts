


export const maxLengthVC = (maxLength: number) => (values: string) => {
    if(values.length > maxLength) return `max length in this field is ${maxLength} symbols, your is ${values.length}`
    if(values.length === 0) return `required value`
}