package waffle.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import waffle.config.property.Profile;
import waffle.security.ApiAuthenticationFailureHandler;
import waffle.security.ApiAuthenticationFilter;
import waffle.security.ApiAuthenticationSuccessHandler;
import waffle.security.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    public static final String H2_CONSOLE = "/h2-console";

    @Value("${spring.profiles.active:production}")
    private String activeProfile;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        if (activeProfile.equals(Profile.LOCAL_TEST.getName())) {
            http.authorizeRequests().antMatchers(SecurityConfig.H2_CONSOLE + "/**")
            .permitAll()
            .and()
            .headers().frameOptions().disable();
        }
    }

    @Bean
    public ApiAuthenticationFilter apiAuthenticationFilter() throws Exception {
        ApiAuthenticationFilter filter = new ApiAuthenticationFilter();
        filter.setAuthenticationSuccessHandler(new ApiAuthenticationSuccessHandler());
        filter.setAuthenticationFailureHandler(new ApiAuthenticationFailureHandler());
        filter.setAuthenticationManager(authenticationManagerBean());
        return filter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        if (activeProfile.equals(Profile.LOCAL_TEST.getName())) {
            return NoOpPasswordEncoder.getInstance();
        }

        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService());
        return provider;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl();
    }

}
