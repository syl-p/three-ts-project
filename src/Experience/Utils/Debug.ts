import * as dat from 'lil-gui'

export default class Debug {
  active: Boolean
  ui!: dat.GUI

  constructor() {
    this.active = window.location.hash === '#debug'
    if(this.active) {
      this.ui = new dat.GUI()
    }
  }

}