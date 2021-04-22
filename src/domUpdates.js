const domUpdates = {
  today:null,

  toggleView(viewToDisplay, viewToHide) {
    viewToDisplay.classList.remove('hidden');
    viewToHide.classList.add('hidden');
  },
}

export default domUpdates;