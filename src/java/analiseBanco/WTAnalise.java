/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package analiseBanco;

//import com.google.gson.Gson;
import java.io.IOException;
import java.util.List;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author anderson
 */
@ServerEndpoint(value = "/analiseBancoWSTables")
public class WTAnalise {

    @OnOpen
    public void onOpen(Session session) throws Exception {
        System.out.println("WTAnalise@ANDERSON --- abriu");
        
    }

    @OnMessage
    public void onMessage(Session session, String message) throws Exception {
        if (message.equals("tables")) {
//            Gson gson = new Gson();
//            String ts = gson.toJson(execute.listar());
//            System.out.println("WTAnalise@ANDERSON --- TS - " + ts);

//            session.getBasicRemote().sendObject(ts);
        }else if (message.equals("columns")) {
//            Gson gson = new Gson();
//            String ts = gson.toJson(execute.listar());
//            session.getBasicRemote().sendObject(ts);
        }
    }

    @OnClose
    public void onClose(Session session) throws Exception {

    }

    @OnError
    public void onError(Throwable t, Session e) throws IOException {
        e.getBasicRemote().sendText(t.getMessage());
    }

    
}
