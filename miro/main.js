

rtb.onReady(() => {
  rtb.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Sticker resizer',
        svgIcon: '<rect x="8.5" y="42.5" width="27" height="27" transform="rotate(-90 8.5 42.5)" stroke="black" stroke-width="3"/><rect x="8.5" y="42.5" width="12" height="12" transform="rotate(-90 8.5 42.5)" stroke="black" stroke-width="3"/><path d="M43.5 9C43.5 8.17157 42.8284 7.5 42 7.5H28.5C27.6716 7.5 27 8.17157 27 9C27 9.82843 27.6716 10.5 28.5 10.5H40.5V22.5C40.5 23.3284 41.1716 24 42 24C42.8284 24 43.5 23.3284 43.5 22.5V9ZM9.06066 44.0607L43.0607 10.0607L40.9393 7.93934L6.93934 41.9393L9.06066 44.0607Z" fill="black"/>',
        positionPriority: 1,
        onClick: async () => {
          rtb.board.ui.openLeftSidebar('sidebar.html')
        }
      }
    }
  })
})
