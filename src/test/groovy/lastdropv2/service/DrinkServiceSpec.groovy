package lastdropv2.service

import com.overmild.lastdropv2.model.Drink
import com.overmild.lastdropv2.repository.DrinkRepository
import com.overmild.lastdropv2.service.DrinkService
import spock.lang.Specification

class DrinkServiceSpec extends Specification {

    DrinkService drinkService
    DrinkRepository drinkRepository

    def setup() {
        drinkRepository = Mock(DrinkRepository)
        drinkService = new DrinkService(drinkRepository)
    }

    def "getDrinkById() returns expected result"() {
        given:
        def drinkId = UUID.randomUUID()

        and:
        1 * drinkRepository.findById(drinkId) >> Optional.of(Drink.builder().name("Sample Drink").build())

        when:
        def result = drinkService.getDrinkById(drinkId)

        then:
        noExceptionThrown()
        result != null
    }
}
