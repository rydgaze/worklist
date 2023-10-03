const getOffsetStyle = (item) => {
  let off = ""
  switch (item.level) {
    case 1:
      off = "ml-[20px]"
      break
    case 2:
      off = "ml-[40px]"
      break
    case 3:
      off = "ml-[60px]"
      break
    case 4:
      off = "ml-[80px]"
      break
    case 5:
      off = "ml-[100px]"
      break
    case 6:
      off = "ml-[120px]"
      break
    case 7:
      off = "ml-[140px]"
      break
    case 8:
      off = "ml-[160px]"
      break
    case 9:
      off = "ml-[180px]"
      break
    case 10:
      off = "ml-[200px]"
      break
  }
  return off
}


export  { getOffsetStyle }
