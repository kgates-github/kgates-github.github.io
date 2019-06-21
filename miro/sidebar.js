rtb.onReady(() => {
  const hues = 11; // Number of base hues (e.g., red, grean, yellow)
  const shades = 7; // Number of shades of each hue
  var bg;
  var base_hue = 0;
  var h_inc = Math.floor(360/hues);
  var text = "";
  const text_colors = {'dark': "#000000", 'light': "#ffffff"}
  var ids = [];
  i = 0;
  
  hue = base_hue;

  for (var h = 0; h < hues; h++) {
    var row = document.createElement("div")
    row.classList.add("flex-container");
    document.getElementById("palette").appendChild(row);

    bg = (h == hues-1) ? tinycolor("hsl(" + hue + ", 0%, 85%)") : 
      tinycolor("hsl(" + hue + ", 45%, 85%)");
    borderColor = (h == hues-1) ? tinycolor("hsl(" + hue + ", 0%, 85%)") : 
      tinycolor("hsl(" + hue + ", 45%, 85%)");

    for (var l = 0; l < shades; l++) {
      var daube = document.createElement("div")
      daube.classList.add("daube");
      daube.style.backgroundColor = bg.toHexString();
      daube.style.borderColor = borderColor.darken(10).toHexString();
      daube.style.color = bg.isDark() ? text_colors['light'] : text_colors['dark'];
      //daube.innerHTML = text
      var id = "fc_" + i;
      daube.id = id;

      row.appendChild(daube);
      bg.darken(10);
      ids.push(id);
      daube.onclick = function() {
        setColor(this.style.backgroundColor);
      }
      i++;
    }
    hue += h_inc;
  }

  // Subscribe on user selected widgets
  rtb.addListener(rtb.enums.event.SELECTION_UPDATED, getWidget);
  const tip = document.getElementById('tip');
  var selectedWidgets = null;


  async function getWidget() {
    // Get selected widgets
    selectedWidgets = await rtb.board.selection.get()
  }

  async function setColor(color) {
    selectedWidgets = await rtb.board.selection.get()
    let stickers = selectedWidgets.filter(widget => widget.type === 'STICKER')

    await rtb.board.widgets.update(stickers.map(sticker => ({
      id: sticker.id,
      style: { stickerBackgroundColor: color }
    })))

    // Show success message
    rtb.showNotification('New color applied')
  }

});
  


