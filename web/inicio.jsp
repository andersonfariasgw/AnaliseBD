<%-- 
    Document   : inicio.jsp
    Created on : 15/11/2013, 01:22:24
    Author     : anderson
--%>
<%@page contentType="text/html" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>Inicial</title>
        <link rel="stylesheet" type="text/css" href="auxiliares/CSS/tabelas.css">
        <link rel="stylesheet" type="text/css" href="auxiliares/CSS/MenuCSS.css">
        
        <script>
            function despesa(){
                window.location = "./DespesasControlador?acao=listar";
            }
            
            function receita(){
                
            }
            
            function orcamento(){
                window.location = "./OrcamentoControlador?acao=listar";
            }
            
            function produto(){
                window.location = "./ProdutosControlador?acao=listar";
            }
            
            function servico(){
                window.location = "./ServicosControlador?acao=listar";
            }
            
            function fornecedor(){
                window.location = "./FornecedorControlador?acao=listar";
                
            }
            
            function TipoProduto(){
                window.location = "./tipoProdutoControlador?acao=listar";
                
            }
            
            function pagamento(){
                
            }
            
            function popInfo(){
               var myWindow = window.open("","myWindow","width=200,height=100");
               myWindow.document.write("<p>- Cadastro de Produtos. <br>- Cadastro de Serviços. <br>- Cadastro de Fornecedores.</p>");
            }
            
        </script>
    </head>
    <body>
        <table>
            <tr>
    
            
            <ul class="menu"> <!-- Esse é o 1 nivel ou o nivel principal -->
               
                <li><a href="#">Cadastros Basicos</a>
                    <ul class="submenu-1"> <!-- Esse é o 2 nivel ou o primeiro Drop Down -->
                        <li><a href="javascript: servico();">Serviço</a></li>
                        <li><a href="javascript: fornecedor();">Fornecedor</a></li>
                        <li><a href="#">Produtos</a>
                                 <ul class="submenu-2"> <!-- Esse é o 3 nivel ou o Segundo Drop Down -->
                                        <li><a href="javascript: produto();">Produto</a></li>
                                        <li><a href="javascript: tipoProduto();">Tipos de Produto</a></li>
                                </ul>
                         </li>
                    </ul>
                </li>
                
                <li><a href="#">Cadastros Finan</a>
                    <ul class="submenu-1">
                        <li><a href="javascript: alert('em andamento');">Orçamento</a></li>
                        <li><a href="javascript: despesa();">Despesa</a></li>
                        <li><a href="javascript: alert('em andamento');">Receita</a></li>
                    </ul>
                </li>
                <li><a href="javascript: alert('em andamento');">Relatorios</a></li>

            </ul>
                </td>
                <td>&nbsp;
                </td>
                <td>&nbsp;
                </td>
                <td align="right" width="50%">
        <font size="2" color="#b40b0b"> versão 0,06</font>
        <input type="button" value="informações da versão" id="info" name="info" onclick="popInfo();">
                </td>
            </tr>
        </table>
    </body>
 </html>
 
 
 
 
 
 
 
 
 
 

 
 
 
 
 
 
 
 
<!-- 
 <!DOCTYPE HTML>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
    <title>Menu Dropdown Horizontal - Linha de Código</title>
      Aqui chamamos o nosso arquivo css externo 
    <link rel="stylesheet" type="text/css"  href="auxiliares/CSS/MENU.css" />
    [if lte IE 8]>
 <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
 <![endif]    
</head>
<body>
<nav>
  <ul class="menu">
		<li><a href="#">Cadastros</a>
	         	<ul>
                        <li><a href="javascript: produto()">produtos</a></li>
	       		</ul>
                        </li>
	  		<li><a href="#">O que fazemos?</a>
	         	<ul>
	                  <li><a href="#">Web Design</a></li>
	                  <li><a href="#">SEO</a></li>
	                  <li><a href="#">Design</a></li>                    
	       		</ul>
			</li>
		<li><a href="#">Fotos</a></li>
		<li><a href="#">Contato</a></li>                
</ul>
</nav>
</body>
</html>-->
