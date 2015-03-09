$(document).ready(function() {

    function graph_basename(mugl) {
        return mugl.replace(/\.xml$/, "");
    }

    function build_example_menu(graphs) {
        var $desktop_menu = $(".example-nav ul");
        var $mobile_menu = $(".example-mobile-nav .btn-group ul.dropdown-menu");
        graphs.forEach(function(g,i) {
            //var li = "<li class='graph"+i+"'><a href='"+g.mugl+"'>"+graph_basename(g.mugl)+"</a></li>";
            // Note: we have to create two separate DOM elements using the above li
            // string, for appending one each to the desktop and mobile menus --- hence
            // we pass $(li) to each, rather than calling $(li) once and passing the
            // result to both.

            $("<li class='graph"+i+"'></li>").append($("<a href='#'>"+graph_basename(g.mugl)+"</a>").click(function() {
                render_graph(graphs, i);
            })).appendTo($desktop_menu);

            $("<li class='graph"+i+"'></li>").append($("<a href='#'>"+graph_basename(g.mugl)+"</a>").click(function() {
                render_graph(graphs, i);
            })).appendTo($mobile_menu);

        });
    }

    function find_graph_index(graphs, graphname) {
        var i;
        for (i=0; i<graphs.length; ++i) {
            if (graphs[i].mugl === graphname+".xml") { return i; }
        }
        return -1;
    }

    function render_graph(graphs, n) {
        var mugl_url = "/examples/graphs/" + graphs[n].mugl;
        $("div.example-graph").empty();
        $("div.example-graph").append($("<div>"));
        window.multigraph.jQuery("div.example-graph div").multigraph({
            'mugl' : mugl_url
        });
        window.history.replaceState({}, "", "./?graph="+graph_basename(graphs[n].mugl));
        $(".example-title").text(graph_basename(graphs[n].mugl));
        $(".example-download a").attr('href', mugl_url).text(graphs[n].mugl);
        $(".example-open a").attr('href', "/tester/?muglurl="+mugl_url);
        $(".example-nav li").removeClass("active");
        $(".example-mobile-nav li").removeClass("active");
        $("li.graph"+n).addClass("active");
        $.ajax({
            url: mugl_url,
            dataType: "text",
            success: function(mugl) {
                $("pre.example.prettyprint code").text(mugl);
                $("pre.example.prettyprint code").each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            },
            error : function (jqXHR, textStatus, errorThrown) {
                console.log('error fetching mugl');
            }
        });
    }


    $.ajax({
        url: "/examples/graphs/graphs.json",
        dataType: "json",
        success: function(graphs) {
            graphs = graphs.filter(function(g) { return g.web; });
            build_example_menu(graphs);

            var m = window.location.toString().match(/.*graph=([^&#]+)/);
            var initial_graph_n = 0;
            if (m) {
                var graphname = m[1];
                initial_graph_n = find_graph_index(graphs, graphname);
            }
            if (initial_graph_n < 0) {
                initial_graph_n = 0;
            }
            render_graph(graphs, initial_graph_n);

        },
        error : function (jqXHR, textStatus, errorThrown) {
            console.log('got an error instead of any examples');
        }
    });

});
