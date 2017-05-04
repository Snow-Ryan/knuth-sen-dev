package cas

import grails.transaction.Transactional

import java.security.SecureRandom

/**
 * Service that creates random tokens for every user that is authenticated
 */
@Transactional
class TokenProviderService {
    private SecureRandom random = new SecureRandom()

    def getToken() {
        return new BigInteger(130, random).toString(32)
    }
}
