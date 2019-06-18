package conexao;

import java.sql.Statement;  
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.SQLException;
import org.apache.catalina.startup.HostConfig;

/**
 *
 * @author anderson
 */
public class postgresConection {
    
    private static String hostConfig = "";
    private static String portaConfig = "";
    private static String loginConfig= "";
    private static String senhaConfig= "";
    private static String BDConfig= "";

    public static Connection pegarConexao() throws ClassNotFoundException, SQLException{
        //Class.forName("org.postgresql.Driver");
        if (hostConfig.trim().equals("") || portaConfig.trim().equals("") || loginConfig.trim().equals("") || 
                senhaConfig.trim().equals("") || BDConfig.trim().equals("")) {
            gerarPadrao();
        }
        Class.forName("org.postgresql.Driver");
        String url ="jdbc:postgresql://"+hostConfig+":"+portaConfig+"/"+BDConfig;//altera-se de acordo com o bd, local host e o nome final
        return DriverManager.getConnection(url, loginConfig, senhaConfig);
    }

    public static Connection pegarConexaoN(String hostConfig, String portaConfig, String loginConfig, String senhaConfig, String BDConfig ) throws ClassNotFoundException, SQLException{
        System.out.println("postgresConection@ANDERSON --- chegando : " + hostConfig + " - " + portaConfig + " - " + loginConfig + " - " + senhaConfig + " - " + BDConfig);

        //Class.forName("org.postgresql.Driver");
        if (hostConfig.trim().equals("") || portaConfig.trim().equals("") || loginConfig.trim().equals("") || 
                senhaConfig.trim().equals("") || BDConfig.trim().equals("")) {
            gerarPadrao();
        }
        Class.forName("org.postgresql.Driver");
        String url ="jdbc:postgresql://"+hostConfig+":"+portaConfig+"/"+BDConfig;//altera-se de acordo com o bd, local host e o nome final
        return DriverManager.getConnection(url, loginConfig, senhaConfig);
    }
    
    public postgresConection(String hostConfig, String portaConfig, String loginConfig, String senhaConfig, String BDConfig) {
        if (hostConfig.trim().equals("") || portaConfig.trim().equals("") || loginConfig.trim().equals("") || 
                senhaConfig.trim().equals("") || BDConfig.trim().equals("")) {
            gerarPadrao();
        }else{
            this.hostConfig = hostConfig;
            this.portaConfig = portaConfig;
            this.loginConfig = loginConfig;
            this.senhaConfig = senhaConfig;
            this.BDConfig = BDConfig;
        }
    }

    public postgresConection() {
        gerarPadrao();
    }
    
    private static void gerarPadrao(){
        hostConfig = "192.168.0.252";
        portaConfig = "5433";
        loginConfig = "postgres";
        senhaConfig = "postgres";
        BDConfig = "MATEUS_INOVACAO_HOMEM";
    }
    
    
}