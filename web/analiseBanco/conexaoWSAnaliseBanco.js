/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function caregar(table) {
    var hostConfig = jQuery("hostConfig");
    var portaConfig = jQuery("portaConfig");
    var loginConfig = jQuery("loginConfig");
    var senhaConfig = jQuery("senhaConfig");
    var BDConfig = jQuery("BDConfig");

    console.log("aquiii = " + table);
    jQuery.ajax({
        url: './AnaliseBanco?acao=pegarColunas',
        dataType: "text",
        method: "post",
        async: false,
        data: {
            acao: "pegarColunas",
            tablePesquisa: table
//            hostConfig: hostConfig,
//            portaConfig: portaConfig,
//            loginConfig: loginConfig,
//            senhaConfig: senhaConfig,
//            BDConfig: BDConfig
        },
        success: function (data) {

            var teste = JSON.parse(data).columns;
            var testereferenciada = JSON.parse(data).tableQueReferenciamEssa;
            var testereferenciadaFK = JSON.parse(data).essaReferenciaOutraTableFK;
            var testeGatilho = JSON.parse(data).gatilhosTable;

            var colunas = jQuery("#colunas > tbody");
            var referenciadaPor = jQuery("#referenciadaPor > tbody");
            var referenciadaFK = jQuery("#referenciadaFK > tbody");
            var colunasGatilhos = jQuery("#gatilhos > tbody");

            colunas.html("");
            referenciadaPor.html("");
            referenciadaFK.html("");
            colunasGatilhos.html("");
            jQuery("#nome_da_table").html(table)

            for (var i = 0; i < teste.length; i++) {
                var column = teste[i];
                colunas.append(
                        jQuery("<tr>")
                        .append(jQuery("<td>").append(jQuery("<label>").append(column.name)))
                        .append(jQuery("<td>").append(jQuery("<label>").append(column.tipoDados)))
                        .append(jQuery("<td>").append(jQuery("<label>").append(column._default)))
                        .append(jQuery("<td>").append(jQuery("<label>").append(column.nullable + "")))
                        .append(jQuery("<td>").append(jQuery("<label>").append(column.descricao)))
                        );
            }

            if (testereferenciada != undefined || testereferenciada != null) {
                for (var o = 0; o < testereferenciada.length; o++) {
                    var referenciada = testereferenciada[o];
                    referenciadaPor.append(
                            jQuery("<tr>")
                            .append(jQuery("<td>").append(jQuery("<label id='" + referenciada.nomeTableReferencia + "' tabela='" + referenciada.nomeTableReferencia + "'>").append(referenciada.nomeTableReferencia)))
                            .append(jQuery("<td>").append(jQuery("<label>").append(referenciada.name)))
                            );
                }
            }

            if (testereferenciadaFK != undefined || testereferenciadaFK != null) {
                for (var u = 0; u < testereferenciadaFK.length; u++) {
                    var referenciadaFKs = testereferenciadaFK[u];
                    referenciadaFK.append(
                            jQuery("<tr>")
                            .append(jQuery("<td>").append(jQuery("<label>").append(referenciadaFKs.name)))
                            .append(jQuery("<td>").append(jQuery("<label tabela='" + referenciadaFKs.nomeTableReferencia + "'>").append(referenciadaFKs.nomeTableReferencia)))
                            .append(jQuery("<td>").append(jQuery("<label>").append(referenciadaFKs.nomeColumnReferencia)))
                            );
                }

            }

            if (testeGatilho != undefined || testeGatilho != null) {
                for (var u = 0; u < testeGatilho.length; u++) {
                    var tableGatilho = testeGatilho[u];
                    colunasGatilhos.append(
                            jQuery("<tr>")
                            .append(jQuery("<td>").append(jQuery("<label>").append(tableGatilho.name)))
                            .append(jQuery("<td>").append(jQuery("<label>").append(tableGatilho.timing)))
                            );
                }

            }
            ativarClick();
//            self.validate(JSON.parse(data).exists, ev);
        }
    });
}

function ativarClick() {
    jQuery("label[tabela]").on('click', function(){
        console.log(jQuery(this));
        caregar(jQuery(this).attr('tabela'));
    });
}

function caregarV(view) {
    var hostConfig = jQuery("hostConfig");
    var portaConfig = jQuery("portaConfig");
    var loginConfig = jQuery("loginConfig");
    var senhaConfig = jQuery("senhaConfig");
    var BDConfig = jQuery("BDConfig");

    console.log("aquiii = " + view);
    jQuery.ajax({
        url: './AnaliseBanco?acao=pegarColunasView',
        dataType: "text",
        method: "post",
        async: false,
        data: {
            acao: "pegarColunasView",
            tablePesquisa: view
//            hostConfig: hostConfig,
//            portaConfig: portaConfig,
//            loginConfig: loginConfig,
//            senhaConfig: senhaConfig,
//            BDConfig: BDConfig
        },
        success: function (data) {

            var teste = JSON.parse(data).columns;
            var definition = JSON.parse(data).definitionView;
            console.log("teste");
            console.log(definition);
            var colunas = jQuery("#colunas > tbody");
            var SQLVIEW = jQuery("#SQLVIEWL");

            colunas.html("");
            SQLVIEW.html("");
            jQuery("#nome_da_table").text(view);
            jQuery("#nome-view-edit").text(view);
            jQuery("#nome-tabela-edit").text(view);

            for (var i = 0; i < teste.length; i++) {
                var column = teste[i];
                colunas.append(
                        jQuery("<tr>")
                        .append(jQuery("<td>").append(jQuery("<label>").append(column.name)))
                        .append(jQuery("<td>").append(jQuery("<label>").append(column.tipoDados)))
                        );
            }

            jQuery("#editing-view").html(definition);
            SQLVIEW.html(definition);

//            self.validate(JSON.parse(data).exists, ev);
        }
    });
}

window.onbeforeunload = function () {
//    desconectar();
};

function send() {
    socket.send("tables");
}
var aqui = "";

jQuery(document).ready(function () {
    colunaMovimentar();
    configBD();


    var tab2 = "";
    var tab3 = "";
    var tab3Completa = "";
    jQuery("label[id*='table_']").each(function () {
        tab2 = tab2 + '<option value="' + this.innerHTML.trim() + '" />';
        tab3 = tab3 + '<div value="' + this.innerHTML.trim() + '"><label>' + this.innerHTML.trim() + "</label></div>";
    });
    tab3Completa = tab3;
    $.fn.autocomp = function (opt) {
        if (opt.width == undefined || opt.width == "") {
            opt.width = "auto";
        }
        return this.each(function () {
//            $(this).css({ all: 'unset' });
            var tudo = jQuery('<div id="tudo" class="tudo">').insertBefore(jQuery(this));
            var complete = jQuery("<div id='complete' class='complete'>").insertAfter(jQuery(this));
            var este = jQuery(this);
            var selected = -1;

            var opcoes = jQuery(tab3).appendTo(complete);

            este.appendTo(tudo);
            complete.appendTo(tudo);

            este.css({"width": opt.width});
            complete.css({"width": opt.width});
            tudo.css({"width": opt.width});
            complete.css({display: "none"});
            opcoes.each(function () {
                jQuery(this).on("mouseover", function () {
                    aqui = jQuery(this).attr('value');
                });
                jQuery(this).on("mouseout", function () {
                    aqui = "";
                });
                console.log(this);
            });
            var listas = opcoes;
            var digitados = "";
            var digitadosTamanho = 0;
            este.on("keyup", function (event) {
                var campo = jQuery(this);
                if (campo.val().length == 0) {
                    opcoes.empty();
                    complete.html("");
                    opcoes = jQuery(tab3Completa).appendTo(complete);
                    opcoes.each(function () {
                        jQuery(this).on("mouseover", function () {
                            aqui = jQuery(this).attr('value');
                        });
                        jQuery(this).on("mouseout", function () {
                            aqui = "";
                        });
                    });

                } else {
                    if (event.keyCode === 13) {
                        return;
                    }
                    opcoes.each(function () {
                        digitadosTamanho = campo.val().length;

                        if (campo.val() !== jQuery(this).children(0).text().substring(0, digitadosTamanho)) {
                            jQuery(this).hide();
                        } else {
                            jQuery(this).show();
                        }
                    });
                }

                if (event.keyCode == "40") {
                    if (selected < (jQuery(complete.children(0)).length - 1)) {
                        selected = selected + 1;
                    }
                    jQuery(opcoes.children(0)[selected]).css({"height": "20px", "background-color": "#6b1be1"});
                } else if (event.keyCode == "38") {
                    selected = selected - 1;
                    jQuery(opcoes.children(0)[selected]).css({"height": "20px", "background-color": "#6b1be1"});
                    if (selected === 0) {
                        selected = 0;
                    } else if (selected < 0) {
                        selected = -1;
                    }
                } else {
                    selected = -1;
                }

            });
            este.focusin(function () {
                var campo = jQuery(this);
                complete.css({display: ""});
                opcoes.each(function () {
                    digitadosTamanho = campo.val().length;

                    if (campo.val() !== jQuery(this).children(0).text().substring(0, digitadosTamanho)) {
                        jQuery(this).hide();
                    } else {
                        jQuery(this).show();
                    }
                });
            })
            este.focusout(function () {
                if (aqui !== "") {
                    este.val(aqui);
                }
                complete.css({display: "none"});
            });
        });
    };

    jQuery("#plug").autocomp({
        "width": "250px"

    });

    jQuery("#tablesList").html(tab2);

    jQuery(".labelsT").on("click", function () {
        if (travar) {
            return false;
        }
        travar = true;
        jQuery(".labelsT").css("background-color", "#6bd58a");
        jQuery(".labelsV").css("background-color", "#ffffff");
        jQuery(".more-info-view").css("display", "none");
        jQuery(".more-info").css("display", "");
        setTimeout(function () {
            jQuery(".listaTables").animate({"margin-left": "0%"}, 200);
            travar = false;
        }, 200);
        jQuery(".listaViews").animate({"margin-left": "-101%"}, 200);
//           jQuery(".labelsT").animate({"background-color": "#6bd58a"}, 500);
//           jQuery(".labelsV").animate({"background-color": "#ffffff"}, 500);
    });
    jQuery(".labelsV").on("click", function () {
        if (travar) {
            return false;
        }
        travar = true;
        jQuery(".labelsT").css("background-color", "#ffffff");
        jQuery(".labelsV").css("background-color", "#6b1be1");
        jQuery(".more-info-view").css("display", "");
        jQuery(".more-info").css("display", "none");
        setTimeout(function () {
            style = "background-color: #6bd58a;";
            travar = false;
            jQuery(".listaViews").animate({"margin-left": "0%"}, 200);
        }, 200);
        jQuery(".listaTables").animate({"margin-left": "-101%"}, 200);
//           jQuery(".labelsT").animate({"background-color": "#ffffff"}, 500);
//           jQuery(".labelsV").animate({"background-color": "#6b1be1"}, 500);
    });

    jQuery("#edit-view").on("click", function () {
        var ciente = confirm("ATENÇÃO: se você salvar a SQL errada, será executada no banco e poderá ocorrer erros, está ciente disto?");
        if (ciente) {
            var blackout = jQuery('<div id="blackout">&nbsp;</div>').insertAfter(jQuery("#condigBD"));
            blackout.css({
                "width": "0%",
                "height": "0%",
                "top": "0%",
                "left": "0%",
                "background-color": "RGBA(00,00,00,0.3)",
                "z-index": "900",
                "position": "fixed"
            });
            blackout.animate({
                "width": "100%",
                "height": "100%",
                "top": "0%",
                "left": "0%",
                "background-color": "RGBA(00,00,00,0.3)",
                "z-index": "900",
                "position": "fixed"
            }, 500);
            jQuery("#edit-view-quadro").show(500);
            jQuery("#nome-view-edit").text();
        }
        jQuery(".close-edit-sql").on("click", function () {
            travar = true;
            var editing = jQuery("#edit-view-quadro");
            editing.hide(500);
            blackout.animate({
                "width": "0%",
                "height": "0%",
                "top": "0%",
                "left": "0%",
                "background-color": "RGBA(00,00,00,0.3)",
                "z-index": "0",
                "position": "fixed"
            }, 500);
            travar = false;
        });
    });

//    jQuery("#edit-table").on('click', function(){
//        
//    });
//    
//    jQuery("#submit-edit-tabela").on('click', function(){
//        let tabela = jQuery("#nome-tabela-edit").html();
//        let tipoAlteracao = jQuery("#tipo-alteracao-tabela option:selected").val();
//        let campoAlteracao = jQuery("#campo-alteracao-tabela option:selected").val();
//        if (tabela.includes("delete") || tabela.includes(" ") ) {
//            
//        }
//        "alter table " + tabela + " " + tipoAlteracao + campoAlteracao + "";
//    });

});

var travar = false;
function colunaMovimentar() {
    jQuery("#headMaxq1-view").click(function () {
        if (travar) {
            return false;
        }
        travar = true;
        var minmax = jQuery("#headMaxq1-view").text();
        if (minmax == "(MAX)") {
            jQuery(".quadro-info_1-view").animate({"width": "90.5%"}, 500).animate({"height": "90%"}, 500);
            jQuery(".quadro-info_2-view").animate({"width": "1%", "left": "92%", "opacity": "0"}, 550);
            setTimeout(function () {
                jQuery(".quadro-info_3-view").animate({"height": "1%", "top": "90%", "opacity": "0"}, 500);
                jQuery(".quadro-info_4-view").animate({"height": "1%", "top": "90%", "opacity": "0"}, 500);
            }, 500);
            setTimeout(function () {
                jQuery("#headMaxq1-view").text("(MIN)");
                travar = false;
            }, 900);
        } else {
            jQuery(".quadro-info_1-view").animate({"height": "40%"}, 520).animate({"width": "40.5%"}, 500);
            jQuery(".quadro-info_3-view").animate({"height": "40%", "top": "50%", "opacity": "1"}, 500);
            jQuery(".quadro-info_4-view").animate({"height": "40%", "top": "50%", "opacity": "1"}, 500);
            setTimeout(function () {
                jQuery(".quadro-info_2-view").animate({"width": "40.5%", "left": "50%", "opacity": "1"}, 550);
            }, 500);
            setTimeout(function () {
                jQuery("#headMaxq1-view").text("(MAX)");
                travar = false;
            }, 900);
        }
    });

    jQuery("#headMaxq2-view").click(function () {
        if (travar) {
            return false;
        }
        travar = true;
        var minmax = jQuery("#headMaxq2-view").text();
        if (minmax == "(MAX)") {
            jQuery(".quadro-info_2-view").animate({"width": "90.5%", "left": "0%"}, 500).animate({"height": "90%"}, 500);
            jQuery(".quadro-info_1-view").animate({"width": "1%", "opacity": "0"}, 550);
            setTimeout(function () {
                jQuery(".quadro-info_3-view").animate({"height": "1%", "top": "90%", "opacity": "0"}, 500);
                jQuery(".quadro-info_4-view").animate({"height": "1%", "top": "90%", "opacity": "0"}, 500);
            }, 500);
            setTimeout(function () {
                jQuery("#headMaxq2-view").text("(MIN)");
                travar = false;
            }, 900);
        } else {
            jQuery(".quadro-info_2-view").animate({"height": "40%"}, 520).animate({"width": "40.5%", "left": "50%"}, 500);
            jQuery(".quadro-info_3-view").animate({"height": "40%", "top": "50%", "opacity": "1"}, 500);
            jQuery(".quadro-info_4-view").animate({"height": "40%", "top": "50%", "opacity": "1"}, 500);
            setTimeout(function () {
                jQuery(".quadro-info_1-view").animate({"width": "40.5%", "opacity": "1"}, 550);
            }, 500);
            setTimeout(function () {
                jQuery("#headMaxq2-view").text("(MAX)");
                travar = false;
            }, 900);
        }
    });

    jQuery("#headMaxq1").click(function () {
        if (travar) {
            return false;
        }
        travar = true;
        var minmax = jQuery("#headMaxq1").text();
        if (minmax == "(MAX)") {
            jQuery(".quadro-info_1").animate({"width": "90.5%"}, 500).animate({"height": "90%"}, 500);
            jQuery(".quadro-info_2").animate({"width": "1%", "left": "92%", "opacity": "0"}, 550);
            setTimeout(function () {
                jQuery(".quadro-info_3").animate({"height": "1%", "top": "90%", "opacity": "0"}, 500);
                jQuery(".quadro-info_4").animate({"height": "1%", "top": "90%", "opacity": "0"}, 500);
            }, 500);
            setTimeout(function () {
                jQuery("#headMaxq1").text("(MIN)");
                travar = false;
            }, 900);
        } else {
            jQuery(".quadro-info_1").animate({"height": "40%"}, 520).animate({"width": "40.5%"}, 500);
            jQuery(".quadro-info_3").animate({"height": "40%", "top": "50%", "opacity": "1"}, 500);
            jQuery(".quadro-info_4").animate({"height": "40%", "top": "50%", "opacity": "1"}, 500);
            setTimeout(function () {
                jQuery(".quadro-info_2").animate({"width": "40.5%", "left": "50%", "opacity": "1"}, 550);
            }, 500);
            setTimeout(function () {
                jQuery("#headMaxq1").text("(MAX)");
                travar = false;
            }, 900);
        }
    });

    jQuery("#headMaxq2").click(function () {
        if (travar) {
            return false;
        }
        travar = true;
        var minmax = jQuery("#headMaxq2").text();
        if (minmax == "(MAX)") {
            jQuery(".quadro-info_2").animate({"width": "90.5%", "left": "0%"}, 500).animate({"height": "90%"}, 500);
            jQuery(".quadro-info_1").animate({"width": "1%", "opacity": "0"}, 550);
            setTimeout(function () {
                jQuery(".quadro-info_3").animate({"height": "1%", "top": "90%", "opacity": "0"}, 500);
                jQuery(".quadro-info_4").animate({"height": "1%", "top": "90%", "opacity": "0"}, 500);
            }, 500);
            setTimeout(function () {
                jQuery("#headMaxq2").text("(MIN)");
                travar = false;
            }, 900);
        } else {
            jQuery(".quadro-info_2").animate({"height": "40%"}, 520).animate({"width": "40.5%", "left": "50%"}, 500);
            jQuery(".quadro-info_3").animate({"height": "40%", "top": "50%", "opacity": "1"}, 500);
            jQuery(".quadro-info_4").animate({"height": "40%", "top": "50%", "opacity": "1"}, 500);
            setTimeout(function () {
                jQuery(".quadro-info_1").animate({"width": "40.5%", "opacity": "1"}, 550);
            }, 500);
            setTimeout(function () {
                jQuery("#headMaxq2").text("(MAX)");
                travar = false;
            }, 900);
        }
    });

    jQuery("#headMaxq3").click(function () {
        if (travar) {
            return false;
        }
        travar = true;
        var minmax = jQuery("#headMaxq3").text();
        if (minmax == "(MAX)") {
            jQuery(".quadro-info_3").animate({"width": "90.5%", "top": "0%", "height": "90%"}, 500);
            jQuery(".quadro-info_4").animate({"width": "1%", "left": "92%", "opacity": "0"}, 550).animate({"left": "0%"}, 0);
            jQuery(".quadro-info_1").animate({"height": "1%", "top": "0%", "opacity": "0"}, 500);
            jQuery(".quadro-info_2").animate({"height": "1%", "top": "0%", "opacity": "0"}, 500);
            setTimeout(function () {
                jQuery("#headMaxq3").text("(MIN)");
                travar = false;
            }, 500);
        } else {
            jQuery(".quadro-info_3").animate({"height": "40%", "width": "40.5%", "top": "50%"}, 500);
            jQuery(".quadro-info_1").animate({"height": "40%", "top": "0%", "opacity": "1"}, 500);
            jQuery(".quadro-info_2").animate({"height": "40%", "top": "0%", "left": "50%", "opacity": "1"}, 500);
            jQuery(".quadro-info_4").animate({"left": "92%"}, 0).animate({"width": "40.5%", "left": "50%", "opacity": "1"}, 550);
            setTimeout(function () {
                jQuery("#headMaxq3").text("(MAX)");
                travar = false;
            }, 500);
        }
    });

    jQuery("#headMaxq4").click(function () {
        if (travar) {
            return false;
        }
        travar = true;
        var minmax = jQuery("#headMaxq4").text();
        if (minmax == "(MAX)") {
            jQuery(".quadro-info_4").animate({"width": "90.5%", "left": "0%", "top": "0%", "height": "90%"}, 500);
            jQuery(".quadro-info_3").animate({"width": "1%", "left": "0%", "opacity": "0"}, 550);
            jQuery(".quadro-info_1").animate({"height": "1%", "top": "0%", "opacity": "0"}, 500);
            jQuery(".quadro-info_2").animate({"height": "1%", "top": "0%", "opacity": "0"}, 500);
            setTimeout(function () {
                jQuery("#headMaxq4").text("(MIN)");
                travar = false;
            }, 500);
        } else {
            jQuery(".quadro-info_4").animate({"height": "40%", "left": "50%", "width": "40.5%", "top": "50%"}, 500);
            jQuery(".quadro-info_3").animate({"width": "40.5%", "opacity": "1"}, 550);
            jQuery(".quadro-info_1").animate({"height": "40%", "top": "0%", "opacity": "1"}, 500);
            jQuery(".quadro-info_2").animate({"height": "40%", "top": "0%", "left": "50%", "opacity": "1"}, 500);
            setTimeout(function () {
                jQuery("#headMaxq4").text("(MAX)");
                travar = false;
            }, 500);
        }
    });
}
function configBD() {
    var blackout = jQuery('<div id="blackout">&nbsp;</div>').insertAfter(jQuery("#condigBD"));
    var config = jQuery("#config");
//    blackout.append(config);
    jQuery("#condigBD").on("click", function () {

        if (travar) {
            return false;
        }
        config.show(500);
        travar = true;
        blackout.css({
            "width": "0%",
            "height": "0%",
            "top": "0%",
            "left": "0%",
            "background-color": "RGBA(00,00,00,0.3)",
            "z-index": "900",
            "position": "fixed"
        });
        blackout.animate({
            "width": "100%",
            "height": "100%",
            "top": "0%",
            "left": "0%",
            "background-color": "RGBA(00,00,00,0.3)",
            "z-index": "900",
            "position": "fixed"
        }, 500);
        travar = false;


//        blackout.on("click", function(){
//            blackout.animate({
//                "width":"0%", 
//                "height":"0%", 
//                "top":"0%", 
//                "left":"0%",
//                "background-color": "RGBA(00,00,00,0.3)", 
//                "z-index":"900", 
//                "position":"fixed",
//                "display": "none"
//            },500);
//            setTimeout(function(){
//                blackout.hide();
//            },500);
//        });
    });

    jQuery("#fechar").on("click", function () {
        travar = true;
        config.hide(500);
        blackout.animate({
            "width": "0%",
            "height": "0%",
            "top": "0%",
            "left": "0%",
            "background-color": "RGBA(00,00,00,0.3)",
            "z-index": "0",
            "position": "fixed"
        }, 500);
        travar = false;
    });

}

function mudarBanco() {
    var hostConfig = jQuery("#hostConfig").val();
    var portaConfig = jQuery("#portaConfig").val();
    var loginConfig = jQuery("#loginConfig").val();
    var senhaConfig = jQuery("#senhaConfig").val();
    var BDConfig = jQuery("#BDConfig").val();
    alert("caminho: " + "AnaliseBanco?acao=recuperarTablesColumns&host=" + hostConfig + "&login=" + loginConfig + "&porta=" + portaConfig + "&senha=" + senhaConfig + "&bd=" + BDConfig)
    window.location.href = "AnaliseBanco?acao=recuperarTablesColumns&host=" + hostConfig + "&login=" + loginConfig + "&porta=" + portaConfig + "&senha=" + senhaConfig + "&bd=" + BDConfig;
}
    