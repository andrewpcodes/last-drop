package lastdropv2.service

import com.overmild.lastdropv2.model.Drink
import com.overmild.lastdropv2.repository.DrinkRepository
import com.overmild.lastdropv2.service.DrinkService
import jakarta.persistence.EntityNotFoundException
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

    def "getDrinkById() throws EntityNotFoundException when drink not found"() {
        given:
        def drinkId = UUID.randomUUID()
        1 * drinkRepository.findById(drinkId) >> Optional.empty()

        when:
        drinkService.getDrinkById(drinkId)

        then:
        thrown(EntityNotFoundException)
    }

    def "createDrink() saves and returns drink"() {
        given:
        def drink = Drink.builder().name("New Drink").build()
        1 * drinkRepository.save(drink) >> drink

        when:
        def result = drinkService.createDrink(drink)

        then:
        noExceptionThrown()
        result == drink
    }

    def "updateDrink() returns updated drink when it exists"() {
        given:
        def drinkId = UUID.randomUUID()
        def drink = Drink.builder().id(drinkId).name("Updated").build()
        1 * drinkRepository.existsById(drinkId) >> true
        1 * drinkRepository.save(drink) >> drink

        when:
        def result = drinkService.updateDrink(drink)

        then:
        noExceptionThrown()
        result == drink
    }

    def "updateDrink() throws EntityNotFoundException when drink not found"() {
        given:
        def drinkId = UUID.randomUUID()
        def drink = Drink.builder().id(drinkId).name("Updated").build()
        1 * drinkRepository.existsById(drinkId) >> false

        when:
        drinkService.updateDrink(drink)

        then:
        thrown(EntityNotFoundException)
    }

    def "searchDrinks() returns all drinks when name is null"() {
        given:
        def drinks = [Drink.builder().name("Mojito").build()]
        1 * drinkRepository.findAll() >> drinks

        when:
        def result = drinkService.searchDrinks(null)

        then:
        noExceptionThrown()
        result == drinks
    }

    def "searchDrinks() filters by name when name is provided"() {
        given:
        def drinks = [Drink.builder().name("Mojito").build()]
        1 * drinkRepository.findByNameContainingIgnoreCase("moji") >> drinks

        when:
        def result = drinkService.searchDrinks("moji")

        then:
        noExceptionThrown()
        result == drinks
    }
}
