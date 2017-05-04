package cas

import grails.transaction.Transactional
import java.nio.charset.Charset;
import java.security.MessageDigest;

/**
 * Service class for hashing passwords
 * Uses and MD5 algorithm combined with UTF-8 encoding
 */
@Transactional
class Md5passService {

    /**
     * Hashes a string and returns it
     * @param pass
     * @return
     */
    def getEncryptedPass(String pass) {
        MessageDigest md = MessageDigest.getInstance("MD5")

        md.update(pass.getBytes(Charset.forName("UTF-8")))

        byte[] mdbytes = md.digest();

        StringBuffer sb = new StringBuffer()
        for (int i = 0; i < mdbytes.length; i++) {
            sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1))
        }

        return sb.toString()
    }
}
