package lastdropv2.controller

import com.overmild.lastdropv2.controller.DrinkController
import com.overmild.lastdropv2.model.Drink
import com.overmild.lastdropv2.service.DrinkService
import spock.lang.Specification

class DrinkControllerSpec extends Specification {

    DrinkController drinkController
    DrinkService drinkService = Mock(DrinkService)

    def setup() {
        drinkController = new DrinkController(drinkService)
    }

    def "getDrinkById() returns expected result"() {
        given: "A drink ID"
        def drinkId = UUID.randomUUID()

        and: "Mocking the DrinkService to return a sample drink"
        1 * drinkService.getDrinkById(drinkId) >> Drink.builder().name("Sample Drink").build()

        when: "The getDrink method is called with the drink ID"
        def result = drinkController.getDrink(drinkId)

        then: "Result should not be null and should match expected drink"
        noExceptionThrown()
        result != null
    }
}
