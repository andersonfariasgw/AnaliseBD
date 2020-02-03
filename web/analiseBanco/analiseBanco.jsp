<%-- 
    Document   : analiseBanco
    Created on : 13/03/2017, 12:46:17
    Author     : anderson
--%>

<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
    <head>
        <script src="./jQuery/jquery.js" type="text/javascript"></script>
        <script src="./analiseBanco/conexaoWSAnaliseBanco.js" type="text/javascript"></script>
        <link href="./analiseBanco/analiseBanco.css" rel="stylesheet" type="text/css"/>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>Gerencia de Tabelas BD</title>
    </head>
    <body>
        <div class="quadroTables">
            <label class="labelsT">Lista de tabelas</label>
            <label class="labelsV">Lista de Views</label>
            <div class="listaTables">
<!--                            <input type="text"  id="meucomplete" list="tablesList">

                            <input id="plug">
                    <datalist id="tablesList"></datalist>-->
                <c:forEach items="${tables}" var="table">
                    <div class="eachTables">
                        <div class="tooltip">
                            <label id="table_${table.name}" onclick="caregar('${table.name}')">
                                ${table.name}
                            </label>
                        </div>
                    </div>
                </c:forEach>
            </div>
            <div class="listaViews" style="margin-left: -101%;">
                <c:forEach items="${views}" var="table">
                    <div class="eachTables">
                        <div class="tooltip">
                            <label id="view_${table.name}" onclick="caregarV('${table.name}')">
                                ${table.name}
                            </label>
                        </div>
                    </div>
                </c:forEach>
            </div>
        </div>
        <div>
            <div>
                <label></label>
            </div>
            <div>
                <div>
                    
                </div>
            </div>
        </div>
        <div class="info-tables">
            <div class="nome-table">
                <label id="nome_da_table">
                    Selecione uma tabela ao lado
                </label>
                <label id="condigBD">Config. BD</label>
            </div>
            <div class="more-info">
                <div class='quadro-info_1'>
                    
                    <div class="component">
                        <div class='head'>Colunas <label id="headMaxq1">(MAX)</label></div>
                        <div class='body'>
                            <table style="width: 100%" id="colunas" class="alinharEsquerda">
                                <thead class="">
                                    <tr>
                                        <th>Nome</th>
                                        <th>Tipo</th>
                                        <th>Default</th>
                                        <th>Not Null</th>
                                        <th>Descrição</th>
                                    </tr>
                                </thead>
                                <tbody class="">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
                <div class='quadro-info_2'>
                    <div class="component">
                        <div class='head'>Gatilhos <label id="headMaxq2">(MAX)</label> </div>
                        <div class='body'>
                            <table style="width: 100%" id="gatilhos" class="alinharEsquerda">
                                <thead>
                                    <tr>
                                        <th>Trigger</th>
                                        <th>Tempo Execução</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <!--<div class='foot'></div>-->
                    </div>
                    
                </div>
                <div class='quadro-info_3'>
                    <div class="component">
                        <div class='head'>Tem referencias(FK) <label id="headMaxq3">(MAX)</label></div>
                        <div class='body'>
                            <table style="width: 100%" id="referenciadaFK" class="alinharEsquerda">
                                <thead>
                                    <tr>
                                        <th>campo na tabela</th>
                                        <th>nome da tabela referenciada</th>
                                        <th>Nome da coluna referenciada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <!--<div class='foot'></div>-->
                    </div>
                </div>
                <div class='quadro-info_4'>
                    <div class="component">
                        <div class='head'>É referenciada por <label id="headMaxq4">(MAX)</label></div>
                        <div class='body'>
                            <table style="width: 100%" id="referenciadaPor" class="alinharEsquerda">
                                <thead>
                                    <tr>
                                        <th>nome da tabela</th>
                                        <th>Nome da coluna</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            
                            
                        </div>
                        <!--<div class='foot'></div>-->
                    </div>
                    
                </div>
            </div>
            <div class="more-info-view" style="display: none">
                <div class='quadro-info_1-view'>
                    
                    <div class="component">
                        <div class='head'>Colunas <label id="headMaxq1-view">(MAX)</label></div>
                        <div class='body'>
                            <table style="width: 100%" id="colunas" class="alinharEsquerda">
                                <thead class="">
                                    <tr>
                                        <th>Coluna na view</th>
                                        <th>Tipo da coluna</th>
                                    </tr>
                                </thead>
                                <tbody class="">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class='quadro-info_2-view'>
                    
                    <div class="component">
                        <div class='head'>SQL <label id="headMaxq2-view">(MAX)</label><label id="edit-view">EDITAR</label></div>
                        <div class='body'>
                            <table style="width: 100%" id="SQLVIEW" class="alinharEsquerda">
                                <thead class="">
                                </thead>
                                <tbody class="">
                                <textarea class="sql-view" readonly="true" id="SQLVIEWL"></textarea>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="config" class="quadro central" style="display: none">
            <div class="component">
                <div class="head">
                    Coloque os dados da conexão desejada
                    <div class="closeConfBD">
                        <a id="fechar" style="cursor: pointer;">fechar</a>
                    </div>
                </div>
                <div class="body" style="padding-top: 1%">
                    <div>
                        host:  <input id="hostConfig">
                    </div>
                    <div>
                        porta: <input id="portaConfig">
                    </div>
                    <div>
                        login: <input id="loginConfig">
                    </div>
                    <div>
                        senha: <input id="senhaConfig">
                    </div>
                    <div>
                        banco: <input id="BDConfig">
                    </div>
                    <div>
                        <input type="button" value="Pesquisar" onclick="mudarBanco()">
                    </div>
                </div>
                <div class="foot"></div>
            </div>
        </div>
        <div class="quadro central" id="edit-view-quadro" style="display: none">
            <div class="head">
                EDITANDO A SQL (<label id="nome-view-edit"></label>)
                    <div class="close-edit-sql">
                        <a id="fechar" style="cursor: pointer;">fechar</a>
                    </div>
            </div>
            <div class="body">
                <textarea id="editing-view" class="sql-view"></textarea>
            </div>
            <div class="foot central">
                <input type="button" value="SUBMIT" id="submit-edit-sql">
            </div>
                
        </div>
        
        
<!--        <div class="quadro central" id="edit-table-quadro" style="display: ">
            <div class="head">
                EDITANDO A SQL (<label id="nome-view-edit"></label>)
                    <div class="close-edit-sql">
                        <a id="fechar" style="cursor: pointer;">fechar</a>
                    </div>
            </div>
            <div class="body">
                <select id='tipo-alteracao-tabela'>
                    <option value='add'>Criar</option>
                </select>
                <br>
                <select id='campo-alteracao-tabela'>
                    <option value='column'>Coluna</option>
                </select>
                <br>
                Nome:
                <input type="text" id="nome-alteracao-tabela">
                <br>
                Tipo: 
                <select id="tipo-campo-tabela">
                    <option value='varchar'>Varchar</option>
                </select>
                Tamanho:
                <input type='text' id='tamanho-alteracao-tabela'>
                <br>
                Default:
                <input type='text' id='defaults-alteracao-tabela'>
            </div>
            <div class="foot central">
                <input type="button" value="SUBMIT" id="submit-edit-tabela">
            </div>
                
        </div>-->
        
        
        <!--<input type="button" value='editar tabela' id='edit-table'>-->
        
        
<!--        <table style="border: 1px solid black;">
            <thead>
                <tr >
                    <th style='background-color: #ddddff'>Coluna</th>
                    <th style='background-color: #ddddff'>Tipo</th>
                    <th style='background-color: #ddddff'>Not Null ?</th>
                    <th style='background-color: #ddddff'>Comentário</th>
                </tr>
            </thead>
        </table>-->
    </body>
</html>
