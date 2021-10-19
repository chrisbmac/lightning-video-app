export const gridBuilderAdd = (tag, keysArray, w, h, fontSize, textColor, textAlign) => {
  return tag.add(
    keysArray.map((char, ind) => {
      let newWidth = w
      let newFontSize = fontSize
      if (char === '.com') {
        newWidth = 80
        newFontSize = 30
      } else {
        newWidth = w
        newFontSize = fontSize
      }
      return {
        w: newWidth,
        h: h,
        Text: {
          x: 5,
          text: { text: char, textColor: textColor, textAlign: textAlign, fontSize: newFontSize },
        },
        ind,
      }
    })
  )
}
