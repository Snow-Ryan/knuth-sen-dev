package cas

import org.apache.commons.lang.RandomStringUtils;
import grails.transaction.Transactional

/**
 * Service that creates a random password for every new user
 */
@Transactional
class PasswordRandomizerService {

    def getRandomPass() {
        return(RandomStringUtils.random(8, true, true))
    }
}
