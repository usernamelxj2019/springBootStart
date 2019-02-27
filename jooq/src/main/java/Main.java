import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.Result;
import org.jooq.SQLDialect;
import org.jooq.impl.DSL;

import java.sql.Connection;
import java.sql.DriverManager;


public class Main {

    public static void main(String[] args) {
        System.out.println("222222222222222222");


        System.out.println("hello.....");

        // 用户名
//        String userName = "root";
        String userName = "devuser";
        // 密码
        String password = "dreamtech&JKK";
//        String password = "root";
        // mysql连接url
        //root  root
//        String url = "jdbc:mysql://localhost:3306/my_test2?useUnicode=true&characterEncoding=UTF-8";
        String url = "jdbc:mysql://121.40.29.192:3306/test?useUnicode=true&characterEncoding=UTF-8";

        // Connection is the only JDBC resource that we need
        // PreparedStatement and ResultSet are handled by jOOQ, internally
        try (Connection conn = DriverManager.getConnection(url, userName, password)) {
            // ...
            System.out.println("connect......." + conn.getClientInfo());

            DSLContext create = DSL.using(conn, SQLDialect.MYSQL);
            Result<Record> result = create.select().from("Test").fetch();
            for(Record r:result){
                System.out.println(r);
            }
            conn.close();
        }



        // For the sake of this tutorial, let's keep exception handling simple
        catch (Exception e) {
            e.printStackTrace();
        }finally {

        }

    }


}
