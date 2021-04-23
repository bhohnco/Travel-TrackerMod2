const domUpdates = {
  today: null,

  toggleView(viewToDisplay, viewToHide) {
    viewToDisplay.classList.remove('hidden');
    viewToHide.classList.add('hidden');
  },

  displayFormError(message) {
    let errorMsg = document.getElementById('error-msg')
    if (message === 'success') {
      errorMsg.innerText = 'Username or password invalid. Please try again.';
    } else {
      errorMsg.innerText = '';
    }
  },

  setDateDefaults() {
    const searchBar = document.getElementById('traveler-date-search');
    searchBar.value = this.today.replace(/\//g, "-");
    console.log(this.today)
  },

  greetTraveler(traveler) {
    let travelerDisplayName = document.getElementById('traveler-name');
    travelerDisplayName.innerText = `Welcome back ${traveler.generateFirstName()}!`
  },

  displayTravelersTotalSpent(total) {
    let totalSpent = document.getElementById("total-spent-traveler")
  }

}

export default domUpdates;