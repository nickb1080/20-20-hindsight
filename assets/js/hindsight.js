// Generated by CoffeeScript 1.6.3
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  (function($) {
    var $event, $special, resizeTimeout;
    $event = $.event;
    $special = void 0;
    resizeTimeout = void 0;
    return $special = $event.special.debouncedresize = {
      setup: function() {
        return $(this).on("resize", $special.handler);
      },
      teardown: function() {
        return $(this).off("resize", $special.handler);
      },
      handler: function(event, execAsap) {
        var args, context, dispatch;
        context = this;
        args = arguments;
        dispatch = function() {
          event.type = "debouncedresize";
          return $event.dispatch.apply(context, args);
        };
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }
        if (execAsap) {
          return dispatch();
        } else {
          return resizeTimeout = setTimeout(dispatch, $special.threshold);
        }
      },
      threshold: 150
    };
  })(jQuery);

  window.Hindsight = (function() {
    var bindActions, fnWaypoint, initialize, navigateToPost, pageSetup, pageWidthClass, scrollTop, settings, tableDataBind, tableReflow, utils;
    settings = {
      windo: $(window),
      page: $("html"),
      body: $("body"),
      menuToggle: $("#dropdown-toggle"),
      widePostNav: $(".fixed-post-nav"),
      topLink: $(".top-link"),
      field: $("#field"),
      content: $("#content"),
      tables: $("table"),
      homepagePathname: "/",
      touchDevice: 'ontouchstart' in window || 'onmsgesturechange' in window,
      eventType: this.touchDevice ? 'touchstart' : 'click',
      remSize: function() {
        return settings.page.css("font-size");
      }
    };
    initialize = function() {
      var s;
      s = settings;
      console.log(s);
      pageSetup(s);
      return bindActions(s);
    };
    bindActions = function(s) {
      s.menuToggle.bind(s.eventType, function(e) {
        return s.page.toggleClass("dropdown-open");
      });
      s.topLink.bind(s.eventType, function(e) {
        return scrollTop(e);
      });
      s.widePostNav.bind(s.eventType, function() {
        return navigateToPost($(this).attr("data-target-url").split("/").pop());
      });
      s.windo.bind('debouncedresize', function() {
        pageWidthClass();
        return s.tables.each(function() {
          return tableReflow($(this));
        });
      });
      s.content.waypoint(function(dir) {
        if (s.page.is(".no-touch.page-width-wide.first-index-page")) {
          return fnWaypoint(dir, s.page, "fixed-header");
        } else {
          return s.page.removeClass("fixed-header");
        }
      }, {
        offset: 6 * parseInt(s.page.css("font-size"))
      });
    };
    scrollTop = function(event) {
      event.preventDefault();
      return body.animate({
        scrollTop: "0px"
      }, 800);
    };
    navigateToPost = function(postId) {
      return window.location.pathname = "/post/" + postId;
    };
    pageWidthClass = function(w) {
      var classList, classToAdd, newClass;
      if (w == null) {
        w = window.innerWidth;
      }
      classToAdd = function(width) {
        switch (false) {
          case !(width < 481):
            return "page-width-narrow";
          case !(width < 971):
            return "page-width-medium";
          default:
            return "page-width-wide";
        }
      };
      classList = ["page-width-narrow", "page-width-medium", "page-width-wide"];
      settings.page.removeClass(classList.join(" ")).addClass(classToAdd(w));
      newClass = classToAdd(w);
      settings.widthClass = newClass;
      return newClass;
    };
    fnWaypoint = function(dir, target, cl) {
      if (dir === "down") {
        target.addClass(cl);
      } else if (dir === "up") {
        target.removeClass(cl);
      }
      return target.is(cl);
    };
    tableReflow = function($table) {
      var parentWidth;
      parentWidth = $table.parent().width();
      if ($table.width() > parentWidth) {
        return $table.addClass("table-reflowed");
      } else {
        return $table.removeClass("table-reflowed");
      }
    };
    tableDataBind = function($table) {
      var columnVals, header, tableBody;
      header = $table.find("thead tr");
      tableBody = $table.find("tbody");
      columnVals = [];
      header.children("th").each(function() {
        return columnVals.push($(this).html());
      });
      return tableBody.find("tr").each(function() {
        return $(this).find("td").each(function(i) {
          return $(this).attr("data-column-title", columnVals[i]);
        });
      });
    };
    pageSetup = function(s) {
      if (s.tables.length) {
        s.tables.each(function() {
          tableDataBind($(this));
          return tableReflow($(this));
        });
      }
      pageWidthClass();
      return s.page.addClass(s.touchDevice ? "yes-touch" : "no-touch");
    };
    utils = {
      arrayRemove: function(array, value) {
        if (__indexOf.call(array, value) >= 0) {
          return array.splice(array.indexOf(value), 1);
        }
      }
    };
    return {
      init: initialize,
      utils: utils,
      widthClass: pageWidthClass,
      settings: settings,
      tableData: tableDataBind,
      reflow: function(t) {
        return tableReflow(t);
      }
    };
  })();

}).call(this);
