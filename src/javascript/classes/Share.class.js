class Share {

  constructor(options) {
    this.facebook = document.querySelector('.interface_fb')
    this.twitter = document.querySelector('.interface_twitter')

    this.bind()
  }

  bind() {
    this.FbClickListener = this.handleFbClick.bind(event, this)
    this.facebook.addEventListener('click', this.FbClickListener)

    this.TwitterClickListener = this.handleTwitterClick.bind(event, this)
    this.twitter.addEventListener('click', this.TwitterClickListener)
  }

  handleFbClick(that, event) {
    that.facebookShare(window.location.href)
  }

  handleTwitterClick(that, event) {
    that.twitterShare('Découvrez les talents d\'ASTERIOS', window.location.href)
  }

  facebookShare(url) {
    var url = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
    this.popup(url, 520, 300);
  }

  twitterShare(message, url) {
    var url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(message + ' ' + url);
    this.popup(url, 520, 300);
  }

  popup(url, width, height) {
    var left = Math.floor((window.innerWidth - width) * 0.5),
      top = Math.floor((window.innerHeight - height) * 0.5);
    window.open(url, '', 'top=' + top + ',left=' + left + ',width=' + width + ',height=' + height + ',menubar=no,scrollbars=no,statusbar=no');
  }

}

export default Share
