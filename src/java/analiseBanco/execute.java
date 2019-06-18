/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package analiseBanco;

import conexao.postgresConection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author anderson
 */
public class execute {

    public static void main(String[] args) throws SQLException {
        listar();
    }
    static String host = "";
    static String login = "";
    static String porta = "";
    static String senha = "";
    static String bd = "";
    
    public static List<Table> listar() throws SQLException{
        List<Table> tables = new ArrayList<Table>();
            Connection c = null;
        try {   
            
            c = postgresConection.pegarConexaoN(host, porta, login, senha, bd);
            String sql = "SELECT * FROM pg_catalog.pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema', 'pg_toast') ORDER BY schemaname, tablename";
            PreparedStatement prep = c.prepareStatement(sql);
            ResultSet rs = prep.executeQuery();
            
            Table t = null;
            while (rs.next()) {
                t = new Table();
                t.setName(rs.getString("tablename"));
                tables.add(t);
            }
            
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(execute.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(execute.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            if (c != null) {
                c.close();
            }
        }
        return tables;
    }
    
    public static List<Table> listarViews() throws SQLException{
        List<Table> tables = new ArrayList<Table>();
            Connection c = null;
        try {   
            c = postgresConection.pegarConexaoN(host, porta, login, senha, bd);
            System.out.println("execute@ANDERSON --- valors = " + host + " - "+ porta + " - "+ login  + " - "+ senha + " - "+ bd + " - ");

//            c = postgresConection.pegarConexao();
//            String sql = "SELECT * FROM pg_catalog.pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema', 'pg_toast') ORDER BY schemaname, tablename";
            String sql = "select view_name from information_schema.view_column_usage where view_schema NOT IN ('pg_catalog', 'information_schema', 'pg_toast') group by view_name";
            PreparedStatement prep = c.prepareStatement(sql);
            ResultSet rs = prep.executeQuery();
            
            Table t = null;
            while (rs.next()) {
                t = new Table();
                t.setName(rs.getString("view_name"));
                tables.add(t);
            }
            
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(execute.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(execute.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            if (c != null) {
                c.close();
            }
        }
        return tables;
    }
    
    public static Table listarColumns(String tablePesquisa, String hostConfig, String portaConfig, String loginConfig, String senhaConfig, String BDConfig) throws SQLException, ClassNotFoundException{


            Connection c = postgresConection.pegarConexaoN(host, porta, login, senha, bd);
            String sqlC = " SELECT c.column_name, c.is_nullable, c.data_type, c.column_default, pgd.description " +
                          " FROM pg_catalog.pg_statio_all_tables as st " +
                          "  right join pg_catalog.pg_description pgd on (pgd.objoid=st.relid) " +
                          "  right join information_schema.columns c on (pgd.objsubid=c.ordinal_position and c.table_schema=st.schemaname and c.table_name=st.relname) " +
                          "  where c.table_name = ?";
            PreparedStatement prepC = null;
            ResultSet rsC = null;
            Column column = null;
            Table table = new Table();
            try {
                prepC = c.prepareStatement(sqlC);
                prepC.setString(1, tablePesquisa);
                rsC = prepC.executeQuery();
                
                System.out.println("execute@ANDERSON --- chegou SQL =  " + prepC.toString());

                
                while (rsC.next()) {
                    column = new Column();
                    column.setName(rsC.getString("column_name"));
                    column.setDefault(rsC.getString("column_default"));
                    column.setNullable(rsC.getBoolean("is_nullable"));
                    column.setTipoDados(rsC.getString("data_type"));
                    column.setDescricao(rsC.getString("description"));
                    table.getColumns().add(column);
                }
                
                
                sqlC = " SELECT kcu.column_name AS nome_coluna, kcu.TABLE_NAME AS nome_tabela " +
                       " FROM information_schema.constraint_table_usage AS ctu " +
                       " JOIN information_schema.key_column_usage AS kcu ON (ctu.constraint_name = kcu.constraint_name) " +
                       " JOIN information_schema.table_constraints AS tc ON (tc.constraint_name = ctu.constraint_name) " +
                       " WHERE ctu.TABLE_NAME = ? AND tc.constraint_type = 'FOREIGN KEY' group by kcu.TABLE_NAME, kcu.column_name order by kcu.TABLE_NAME;";
                
                prepC = c.prepareStatement(sqlC);
                prepC.setString(1, tablePesquisa);
                rsC = prepC.executeQuery();
                
                while (rsC.next()) {
                    column = new Column();
                    column.setName(rsC.getString("nome_coluna"));
                    column.setNomeTableReferencia(rsC.getString("nome_tabela"));
                    table.getTableQueReferenciamEssa().add(column);
                }
                
                sqlC = "SELECT a.attname AS nome_coluna, clf.relname AS nome_tabela, af.attname AS atributo_ref " +
                       " FROM pg_catalog.pg_attribute a " +
                       "  JOIN pg_catalog.pg_class cl ON (a.attrelid = cl.oid AND cl.relkind = 'r') " +
                       "  JOIN pg_catalog.pg_namespace n ON (n.oid = cl.relnamespace) " +
                       "  JOIN pg_catalog.pg_constraint ct ON (a.attrelid = ct.conrelid AND ct.confrelid != 0 AND ct.conkey[1] = a.attnum) " +
                       "  JOIN pg_catalog.pg_class clf ON (ct.confrelid = clf.oid AND clf.relkind = 'r') " +
                       "  JOIN pg_catalog.pg_namespace nf ON (nf.oid = clf.relnamespace) " +
                       "  JOIN pg_catalog.pg_attribute af ON (af.attrelid = ct.confrelid AND af.attnum = ct.confkey[1]) " +
                       " WHERE cl.relname = ? ";
                
                prepC = c.prepareStatement(sqlC);
                prepC.setString(1, tablePesquisa);
                rsC = prepC.executeQuery();
                
                while (rsC.next()) {
                    column = new Column();
                    column.setName(rsC.getString("nome_coluna"));
                    column.setNomeTableReferencia(rsC.getString("nome_tabela"));
                    column.setNomeColumnReferencia(rsC.getString("atributo_ref"));
                    table.getEssaReferenciaOutraTableFK().add(column);
                }
                
                sqlC = " select trigger_name as nome_coluna, string_agg(action_timing || ' ' || event_manipulation,'/') as event_manipulation " + 
                       " from information_schema.triggers where event_object_table = ? group by trigger_name; ";
                
                prepC = c.prepareStatement(sqlC);
                prepC.setString(1, tablePesquisa);
                rsC = prepC.executeQuery();
                while (rsC.next()) {
                    column = new Column();
                    column.setName(rsC.getString("nome_coluna"));
                    column.setTiming(rsC.getString("event_manipulation"));
                    table.getgatilhosTable().add(column);
                }
                
                
            } catch (SQLException ex) {
                Logger.getLogger(execute.class.getName()).log(Level.SEVERE, null, ex);
            }finally{
                c.close();
            }
            
        return table;
    }
    
    public static Table listarColumnsView(String tablePesquisa, String hostConfig, String portaConfig, String loginConfig, String senhaConfig, String BDConfig) throws SQLException, ClassNotFoundException{


            Connection c = postgresConection.pegarConexaoN(host, porta, login, senha, bd);
            StringBuilder sqlC = new StringBuilder();
//            sqlC.append(" SELECT ");
//            sqlC.append(" table_.column_name as tcolumn, table_.data_type as ttype, view_.table_name as vtable,  view_.column_name as vcolumn ");
//            sqlC.append(" FROM information_schema.columns table_ ");
//            sqlC.append(" join information_schema.view_column_usage view_ ON (view_.view_name = table_.table_name) ");
//            sqlC.append(" WHERE view_.view_name = ? ");
//            sqlC.append(" group by view_.column_name, table_.data_type ,view_.table_name ,table_.column_name ");
//            sqlC.append(" order by table_.column_name ");
            sqlC.append(" SELECT " );
            sqlC.append(" table_.column_name as tcolumn, table_.data_type as ttype " );
            sqlC.append(" FROM information_schema.columns table_ " );
            sqlC.append(" WHERE table_.table_name = ? " );
            sqlC.append(" order by table_.column_name  ");
            PreparedStatement prepC = null;
            ResultSet rsC = null;
            Column column = null;
            Table table = new Table();
            try {
                prepC = c.prepareStatement(sqlC.toString());
                prepC.setString(1, tablePesquisa);
                rsC = prepC.executeQuery();
                
                System.out.println("execute@ANDERSON --- chegou SQL =  " + prepC.toString());

                
                while (rsC.next()) {
                    column = new Column();
                    column.setName(rsC.getString("tcolumn"));
                    column.setTipoDados(rsC.getString("ttype"));
                    table.getColumns().add(column);
                }
                
                
                sqlC = new StringBuilder("select definition from pg_views where viewname  = ? ");
                
                prepC = c.prepareStatement(sqlC.toString());
                prepC.setString(1, tablePesquisa);
                rsC = prepC.executeQuery();
                
                while (rsC.next()) {
                    table.setDefinitionView(rsC.getString("definition"));
                    System.out.println("execute@ANDERSON --- VALORES == " + rsC.getString("definition"));

                }
                
            } catch (SQLException ex) {
                Logger.getLogger(execute.class.getName()).log(Level.SEVERE, null, ex);
            }finally{
                c.close();
            }
            
        return table;
    }
    
}
