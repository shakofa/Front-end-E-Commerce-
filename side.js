function ready(){


  var overlay = document.getElementById('overlay')
  overlay.addEventListener('click', () => {
      var modals = document.querySelectorAll('.modal.active')
      modals.forEach(modal => {
        closeModal(modal)
      })
    })


  var cartBtn = document.getElementsById('toggle-button')
  cartBtn.forEach(button => {
      button.addEventListener('click', () => {
        var modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
      })
    })

    function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
      }
      
      function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
      }
}
