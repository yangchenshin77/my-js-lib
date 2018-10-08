export const copy = content => {
  const copyElement = document.createElement('textarea')
  copyElement.setAttribute('id', 'copyElement')
  copyElement.innerHTML = content
  document.body.appendChild(copyElement)
  copyElement.select()
  document.execCommand('copy')
  copyElement.parentNode.removeChild(copyElement)
}

/**
 * 顯示訊息框 (jQuery, Bootstrap 4)
 *
 * @param {string} message 提示訊息
 * @param {string} alertType 訊息框類型
 * @param {number} duration 顯示時間
 * @param {string} container 父層容器
 */
export const showAlert = (message = '', alertType = 'success', duration = 4500, container = 'body') => {
  if (!$) return

  if ($(container).length) {

    // 初始設定 COntainer class
    if (!$(`${container} .container`).length) {
      $(container).css({
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'z-index': 2000,
        'top': 0,
        'bottom': 0,
        'left': 0,
        'right': 0,
        'padding': '1.5rem 0',
        'pointer-events': 'none'
      }).append($('<div></div>').addClass('container'))
    }

    // 訊息框
    let $alert_box = $('<div></div>')
    let $alert = $('<div></div>')
    $alert_box.appendTo(`${container} .container`)
      .addClass('text-center')
    $alert.appendTo($alert_box)
      .addClass(`alert alert-${alertType}`)
      .css('display', 'inline-block')
      .html(message)
      .alert()
      .hide()
      .fadeIn(_options.fade_duration + 150)
      .delay(duration)
      .fadeOut(_options.fade_duration, () => {
        $alert.alert('close')
        $alert_box.remove()
      })

  }
}
