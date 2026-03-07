package lastdropv2.controller

import com.overmild.lastdropv2.controller.DrinkController
import com.overmild.lastdropv2.model.Drink
import com.overmild.lastdropv2.service.DrinkService
import jakarta.persistence.EntityNotFoundException
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
        result.statusCode.value() == 200
    }

    def "getDrink() propagates EntityNotFoundException"() {
        given:
        def drinkId = UUID.randomUUID()
        1 * drinkService.getDrinkById(drinkId) >> { throw new EntityNotFoundException("not found") }

        when:
        drinkController.getDrink(drinkId)

        then:
        thrown(EntityNotFoundException)
    }

    def "createDrink() returns created drink"() {
        given:
        def drink = Drink.builder().name("New Drink").build()
        1 * drinkService.createDrink(drink) >> drink

        when:
        def result = drinkController.createDrink(drink)

        then:
        noExceptionThrown()
        result.statusCode.value() == 200
    }

    def "updateDrink() returns updated drink"() {
        given:
        def drinkId = UUID.randomUUID()
        def drink = Drink.builder().id(drinkId).name("Updated").build()
        1 * drinkService.updateDrink(drink) >> drink

        when:
        def result = drinkController.updateDrink(drink)

        then:
        noExceptionThrown()
        result.statusCode.value() == 200
    }

    def "deleteDrink() returns 204 no content"() {
        given:
        def drinkId = UUID.randomUUID()
        1 * drinkService.deleteDrink(drinkId)

        when:
        def result = drinkController.deleteDrink(drinkId)

        then:
        noExceptionThrown()
        result.statusCode.value() == 204
    }

    def "searchDrinks() returns list of drinks"() {
        given:
        def drinks = [Drink.builder().name("Mojito").build()]
        1 * drinkService.searchDrinks("moji") >> drinks

        when:
        def result = drinkController.searchDrinks("moji")

        then:
        noExceptionThrown()
        result.statusCode.value() == 200
        result.body == drinks
    }
}
