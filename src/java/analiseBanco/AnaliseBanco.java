/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package analiseBanco;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author anderson
 */
public class AnaliseBanco extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=ISO-8859-1");
        PrintWriter out = response.getWriter();
        RequestDispatcher dispatcher = null;
        try{
            if (request.getParameter("acao").equals("recuperarTablesColumns")) {
                
                execute.host = (request.getParameter("host") == null ? "" : request.getParameter("host"));
                execute.login = (request.getParameter("login") == null ? "" : request.getParameter("login"));
                execute.porta = (request.getParameter("porta") == null ? "" : request.getParameter("porta"));
                execute.senha = (request.getParameter("senha") == null ? "" : request.getParameter("senha"));
                execute.bd = (request.getParameter("bd") == null ? "" : request.getParameter("bd"));
                
                List<Table> ts = execute.listar();
                List<Table> vs = execute.listarViews();
                request.setAttribute("tables", ts);
                request.setAttribute("views", vs);
                String url = "/analiseBanco/analiseBanco.jsp";
                dispatcher = request.getRequestDispatcher(url);
                dispatcher.forward(request, response);
            }else if (request.getParameter("acao").equals("pegarColunas")) {
                tablePesquisa(request, response, out);
            }else if (request.getParameter("acao").equals("pegarColunasView")) {
                viewPesquisa(request, response, out);
            }
        }catch(Exception e){
            System.out.println("ERRO : " + e.getMessage());
            e.printStackTrace();
        }
            
    }
    
    private void tablePesquisa(HttpServletRequest request, HttpServletResponse response, PrintWriter out) throws SQLException, ClassNotFoundException{
        String tablePesquisa = request.getParameter("tablePesquisa");
        String hostConfig = request.getParameter("hostConfig");
        String portaConfig = request.getParameter("portaConfig");
        String loginConfig = request.getParameter("loginConfig");
        String senhaConfig = request.getParameter("senhaConfig");
        String BDConfig = request.getParameter("BDConfig");
        
        Table table = execute.listarColumns(tablePesquisa, hostConfig, portaConfig, loginConfig, senhaConfig, BDConfig);
        Gson gson = new Gson();
        out.print(gson.toJson(table, Table.class));
    }
    
    private void viewPesquisa(HttpServletRequest request, HttpServletResponse response, PrintWriter out) throws SQLException, ClassNotFoundException{
        String tablePesquisa = request.getParameter("tablePesquisa");
        String hostConfig = request.getParameter("hostConfig");
        String portaConfig = request.getParameter("portaConfig");
        String loginConfig = request.getParameter("loginConfig");
        String senhaConfig = request.getParameter("senhaConfig");
        String BDConfig = request.getParameter("BDConfig");
        
        Table table = execute.listarColumnsView(tablePesquisa, hostConfig, portaConfig, loginConfig, senhaConfig, BDConfig);
        Gson gson = new Gson();
        out.print(gson.toJson(table, Table.class));
    }
    

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
