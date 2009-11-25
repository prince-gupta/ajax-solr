(function ($) {

AjaxSolr.CurrentSearchWidget = AjaxSolr.AbstractWidget.extend({
  displayQuery: function (queryObj) {//TODO
    var count = this.countLinks(queryObj);
    if (count) {
      AjaxSolr.theme('list_items', this.target, this.unclickLinks(queryObj, count));
    }
    else {
      $(this.target).html('<div>Viewing all documents!</div>');
    }
  },

  countLinks: function (queryObj) {//TODO
    var count = 0;
    if (queryObj.q) {
      count++;
    }
    else {
      for (var i in queryObj.fq) {
        count++;
      }
    }
    return count;
  },

  unclickLinks: function (queryObj, count) {//TODO
    var links = [];

    var me = this;
    if (count > 1) {
      links.push($('<a href="#"/>').text('remove all').click(function () {
        me.manager.widgets.text.clear();
        me.manager.store.remove('fq');
        me.manager.doRequest(0);
        return false;
      }));
    }

    if (queryObj.q) {
      var widget = this.manager.widgets.text;
      links.push($('<a/>').text('(x) ' + queryObj.q).click(widget.unclickHandler());
    }

    for (var i in queryObj.fq) {
      var widget = this.manager.widgets[queryObj.fq[i].widgetId], facet = queryObj.fq[i].value;
      links.push($('<a/>').text('(x) ' + decodeURIComponent(queryObj.fq[i].toString())).click(widget.unclickHandler(facet));
    }

    return links;
  }
});

})(jQuery);
