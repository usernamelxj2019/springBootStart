import org.jooq.tools.StringUtils;
import org.jooq.util.CatalogDefinition;
import org.jooq.util.DefaultGeneratorStrategy;
import org.jooq.util.Definition;
import org.jooq.util.SchemaDefinition;


public class MyStratege extends DefaultGeneratorStrategy {


    public String getJavaClassName(Definition definition, Mode mode) {
        String name = getFixedJavaClassName(definition);
        return name != null ? name : this.getJavaClassName0(definition, mode);
    }

    private String getJavaClassName0(Definition definition, Mode mode) {
        StringBuilder result = new StringBuilder();
        result.append(StringUtils.toCamelCase(definition.getOutputName().replace(' ', '_').replace('-', '_').replace('.', '_')));
        if (mode == Mode.RECORD) {
            result.append("Record");
        } else if (mode == Mode.DAO) {
            result.append("Dao");
        } else if (mode == Mode.POJO) {
            result.append("Bo");
        } else if (mode == Mode.INTERFACE) {
            result.insert(0, "I");
        }

        return result.toString();
    }

    final String getFixedJavaClassName(Definition definition) {
        if (definition instanceof CatalogDefinition && ((CatalogDefinition) definition).isDefaultCatalog()) {
            return "DefaultCatalog";
        } else {
            return definition instanceof SchemaDefinition && ((SchemaDefinition) definition).isDefaultSchema() ? "DefaultSchema" : null;
        }
    }
//---------------------
//    作者：DoNotStop
//    来源：CSDN
//    原文：https://blog.csdn.net/u013725455/article/details/77145698
//    版权声明：本文为博主原创文章，转载请附上博文链接！
}
