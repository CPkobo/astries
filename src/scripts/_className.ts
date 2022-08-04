export function classNaming(
  def: string,
  classes: string | undefined,
  preset: string | undefined, presets: any): string {

  let clss: string[] = [def]
  if (preset) {
    if (presets[preset]) {
      clss.push(presets[preset])
    } else {
      clss.push(presets.def)
      clss.push(classes)
    }
  } else {
    if (presets) {
      if (presets.def) {
        clss.push(presets.def)
      }
    }
    clss.push(classes)
  }
  return clss.filter(val => { return val }).join(" ")
}