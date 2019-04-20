export const nowDate = (date) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  month = month < 10 ? ("0" + month) : month
  day = day < 10 ? ("0" + day) : day
  hour = hour < 10 ? ("0" + hour) : hour
  minute = minute < 10 ? ("0" + minute) : minute
  second = second < 10 ? ("0" + second) : second
  let format = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  return format
}

export const dateFormat = (time, format) => {
  var date = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': Math.floor((time.getMonth() + 3) / 3),
    'S+': time.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(
      RegExp.$1,
      (time.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? date[k]
          : ('00' + date[k]).substr(('' + date[k]).length)
      )
    }
  }
  return format
}