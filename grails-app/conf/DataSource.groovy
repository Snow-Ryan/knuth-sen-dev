dataSource {
    pooled = true
    jmxExport = true
    driverClassName = "org.h2.Driver"
    username = "root"
    password = "root"
}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = false
//    cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory' // Hibernate 3
    cache.region.factory_class = 'org.hibernate.cache.ehcache.EhCacheRegionFactory' // Hibernate 4
    singleSession = true // configure OSIV singleSession mode
    flush.mode = 'manual' // OSIV session flush mode outside of transactional context
}

// environment specific settings
environments {
    development {
        dataSource {
            driverClassName = 'com.mysql.jdbc.Driver'
            dbCreate = "update" // one of 'create', 'create-drop', 'update', 'validate', ''
            url = "jdbc:mysql://localhost/casdb?useUnicode=yes&characterEncoding=UTF-8"
        }
    }
    test {
        dataSource {
            ddbCreate = "update"
            url = "jdbc:mysql://localhost/casdb?useUnicode=yes&characterEncoding=UTF-8"
            username = "root"
            password = "admin"
            properties {
                maxActive = -1
                minEvictableIdleTimeMillis=60000
                timeBetweenEvictionRunsMillis=5000
                numTestsPerEvictionRun=3
                testOnBorrow=true
                testWhileIdle=true
                testOnReturn=true
                validationQuery="SELECT 1"
            }
        }
    }
    production {
        dataSource {
            dbCreate = "update"
            url = "jdbc:mysql://localhost/casdb?useUnicode=yes&characterEncoding=UTF-8"
            username = "root"
            password = "admin"
            properties {
                maxActive = -1
                minEvictableIdleTimeMillis=60000
                timeBetweenEvictionRunsMillis=5000
                numTestsPerEvictionRun=3
                testOnBorrow=true
                testWhileIdle=true
                testOnReturn=true
                validationQuery="SELECT 1"
            }
        }
    }
}
