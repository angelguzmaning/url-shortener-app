export function setOnChange(setter: (value: string) => void) {
  return ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    setter(value);
}
