package lastdropv2.controller

import com.overmild.lastdropv2.config.SecurityConfig
import com.overmild.lastdropv2.controller.DrinkController
import com.overmild.lastdropv2.model.Drink
import com.overmild.lastdropv2.service.DrinkService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Import
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(DrinkController)
@Import(SecurityConfig)
class DrinkControllerSecuritySpec extends Specification {

    @Autowired
    MockMvc mockMvc

    @MockBean
    DrinkService drinkService

    @MockBean
    JwtDecoder jwtDecoder

    def "unauthenticated GET /drink request returns 401"() {
        when:
        def result = mockMvc.perform(get("/drink").param("id", UUID.randomUUID().toString()))

        then:
        result.andExpect(status().isUnauthorized())
    }

    def "GET /drink with wrong scope returns 403"() {
        when:
        def result = mockMvc.perform(
                get("/drink")
                        .param("id", UUID.randomUUID().toString())
                        .with(jwt().authorities(new SimpleGrantedAuthority("SCOPE_wrong.scope")))
        )

        then:
        result.andExpect(status().isForbidden())
    }

    def "GET /drink with correct scope returns 200"() {
        given:
        def drinkId = UUID.randomUUID()
        drinkService.getDrinkById(drinkId) >> Drink.builder().name("Test Drink").build()

        when:
        def result = mockMvc.perform(
                get("/drink")
                        .param("id", drinkId.toString())
                        .with(jwt().authorities(new SimpleGrantedAuthority("SCOPE_read.drinks")))
        )

        then:
        result.andExpect(status().isOk())
    }

    def "unauthenticated POST /drink request returns 401"() {
        when:
        def result = mockMvc.perform(
                post("/drink")
                        .contentType("application/json")
                        .content('{"name":"Test"}')
        )

        then:
        result.andExpect(status().isUnauthorized())
    }

    def "POST /drink with wrong scope returns 403"() {
        when:
        def result = mockMvc.perform(
                post("/drink")
                        .contentType("application/json")
                        .content('{"name":"Test"}')
                        .with(jwt().authorities(new SimpleGrantedAuthority("SCOPE_read.drinks")))
        )

        then:
        result.andExpect(status().isForbidden())
    }

    def "POST /drink with correct scope returns 200"() {
        given:
        drinkService.createDrink(_) >> Drink.builder().name("Test").build()

        when:
        def result = mockMvc.perform(
                post("/drink")
                        .contentType("application/json")
                        .content('{"name":"Test"}')
                        .with(jwt().authorities(new SimpleGrantedAuthority("SCOPE_create.drinks")))
        )

        then:
        result.andExpect(status().isOk())
    }

    def "unauthenticated DELETE /drink/delete request returns 401"() {
        when:
        def result = mockMvc.perform(
                delete("/drink/delete").param("id", UUID.randomUUID().toString())
        )

        then:
        result.andExpect(status().isUnauthorized())
    }

    def "DELETE /drink/delete with wrong scope returns 403"() {
        when:
        def result = mockMvc.perform(
                delete("/drink/delete")
                        .param("id", UUID.randomUUID().toString())
                        .with(jwt().authorities(new SimpleGrantedAuthority("SCOPE_read.drinks")))
        )

        then:
        result.andExpect(status().isForbidden())
    }

    def "DELETE /drink/delete with correct scope returns 200"() {
        given:
        def drinkId = UUID.randomUUID()

        when:
        def result = mockMvc.perform(
                delete("/drink/delete")
                        .param("id", drinkId.toString())
                        .with(jwt().authorities(new SimpleGrantedAuthority("SCOPE_delete.drinks")))
        )

        then:
        result.andExpect(status().isOk())
    }
}
