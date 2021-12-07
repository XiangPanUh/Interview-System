package com.example.interview.security.handler;

import com.example.interview.security.SecurityUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthenticationSuccessHandlerImpl extends SimpleUrlAuthenticationSuccessHandler {

    @Override                                       //provide by Spring MVC
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        // provide by spring security(user name and permit after login)
                                        Authentication authentication) throws IOException, ServletException {
        SecurityUtils.sendResponse(response, HttpServletResponse.SC_OK, "Login successfully.", null);
    }
    // return user's profile information
}

