const domUpdates = {

  // toggleView(viewToDisplay, viewToHide) {
  //   console.log("toggle")
  //   viewToDisplay.classList.remove('hidden');
  //   viewToHide.classList.add('hidden');
  // },

  displayFormError(message) {
    let errorMsg = document.getElementById('error-msg')
    if (message === 'success') {
      errorMsg.innerText = 'Username or password invalid. Please try again.';
    } else {
      errorMsg.innerText = '';
    }
  },

  generateCurrentDate() {
    const rawDate = new Date();
    let day = rawDate.getDate();
    if (day < 10) {
      day = `0${day.toString()}`
    }
    let month = rawDate.getMonth() + 1;
    if (month < 10) {
      month = `0${month.toString()}`
    }
    const year = rawDate.getFullYear();
    return `${year}/${month}/${day}`
  },

  setDateDefaults() {
    const searchBar = document.getElementById('traveler-date-search');
    searchBar.value = this.today.replace(/\//g, "-");
    console.log(this.today)
  },

  greetTraveler(traveler) {
    let travelerDisplayName = document.getElementById('traveler-name');
    travelerDisplayName.innerText = `Welcome back !`
  },
  // ${traveler.generateFirstName()}

  displayTravelersTotalSpent(total) {
    let totalSpent = document.getElementById("total-spent-traveler");
    totalSpent.innerText = `You have spent $${total} in 2020`;
  }

}

export default domUpdates;