

rtb.onReady(() => {
  rtb.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Sticker resizer',
        svgIcon: '<rect x="6" y="25" width="15.1429" height="15.1429" transform="rotate(-90 6 25)" stroke="black" stroke-width="2"/><rect x="6" y="25" width="6.57143" height="6.57143" transform="rotate(-90 6 25)" stroke="black" stroke-width="2"/><path d="M26 6.00002C26 5.44773 25.5523 5.00002 25 5.00002H16C15.4477 5.00002 15 5.44773 15 6.00002C15 6.5523 15.4477 7.00002 16 7.00002H24V15C24 15.5523 24.4477 16 25 16C25.5523 16 26 15.5523 26 15V6.00002ZM6.27854 26.1357L25.7071 6.70712L24.2929 5.29291L4.86432 24.7215L6.27854 26.1357Z" fill="black"/>',
        positionPriority: 1,
        onClick: async () => {
          rtb.board.ui.openLeftSidebar('sidebar.html')
        }
      }
    }
  })
})
