package com.evn.game.web.aop;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 2019Äê11ÔÂ21ÈÕ
 *
 * @author ayue
 */
public class Interceptor extends HandlerInterceptorAdapter {
        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
                response.setHeader("Access-Control-Allow-Origin", "*");
                return super.preHandle(request, response, handler);
        }
}
