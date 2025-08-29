package lastdropv2.service

import com.overmild.lastdropv2.service.DrinkService
import spock.lang.Specification

class DrinkServiceSpec extends Specification {

    DrinkService drinkService

    def setup() {
        drinkService = new DrinkService()
    }

    def "getDrinkById() returns expected result"() {
        given:
        def drinkId = "someDrinkId"

        when:
        def result = drinkService.getDrinkById(drinkId)

        then:
        noExceptionThrown()
        result != null
        result.name == "Sample Drink"
    }
}
