$(function(){
  var defSettings = {
          sliderType: "min-range",
          editableTooltip: false,
          min: 0,
          max: 255,
          radius: 175,
          width: 40,
          value: 0,
          handleSize: "+30",
          handleShape: "dot",
          circleShape: "pie",
          startAngle: 315
      };
  var values = [];


  function toolTipCallback(data){
    var { tooltip } = data;
    if(!tooltip) return null;
    return (e) => $('<div/>')
      .addClass("slider-tooltip")
      .text(e.value)
      .append($("<div/>").text(tooltip));
  }

  function onChange(ind){
    return e => setValue(ind, e.value);
  }
  function setValue(ind, value){
    var normalize = ((value + 256)%256);
    values[ind] = (normalize >> 4).toString("16") + (normalize % 16).toString("16");
  }

  function getSettings(ind, $el){
    var data = $el.data();
    var callbacks = {
      tooltipFormat: toolTipCallback(data),
      valueChange: onChange(ind),
      create: onChange(ind)
    };

    return { ...data, ...callbacks};
  }

  $(".slider").each((ind, el) => {
    var $self = $(el);
    var settings = getSettings(ind, $self);
    $self.roundSlider({...defSettings, ...settings });
  });

  $(".submit").on("click", function(){
    $.ajax({
      type: "GET",
      url: document.referrer + "./fire?set="+values.reduce((agg, cur) =>agg + cur, '')
    });
  })
})
