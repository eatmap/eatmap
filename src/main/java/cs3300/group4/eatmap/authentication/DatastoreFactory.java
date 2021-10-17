package cs3300.group4.eatmap.authentication;

import com.google.cloud.NoCredentials;
import com.google.cloud.ServiceOptions;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;

import java.util.Objects;

public class DatastoreFactory {
    public static Datastore getDatastore() {
        String environment = System.getenv("JAVA_ENV");
        if (Objects.equals(environment, "production")) {
            return DatastoreOptions.getDefaultInstance().getService();
        }

        DatastoreOptions options = DatastoreOptions.newBuilder()
                .setProjectId(DatastoreOptions.getDefaultProjectId())
                .setHost(System.getenv("DATASTORE_EMULATOR_HOST"))
                .setCredentials(NoCredentials.getInstance())
                .setRetrySettings(ServiceOptions.getNoRetrySettings())
                .build();
        return options.getService();
    }
}
