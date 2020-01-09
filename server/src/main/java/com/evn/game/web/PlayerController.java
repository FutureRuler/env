package com.evn.game.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.evn.game.service.PlayerService;

/**
 * 2020年1月8日
 *
 * @author ayue
 */
@Controller
@RequestMapping("/player")
public class PlayerController {
        private Logger logger = Logger.getLogger(this.getClass());

        @Autowired
        private PlayerService playerService;

        @ResponseBody
        @RequestMapping(value = "/1001", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
        public String getPlayerName(HttpServletRequest request, HttpServletResponse response, String userId, String name) throws IOException {
                // Player player = playerService.getPlayer(Long.valueOf(id));
                JSONObject nameJson = new JSONObject();
                System.out.println(userId);
                System.out.println(name);
                nameJson.put("cmd", "1001");
                nameJson.put("playerId", "10000");
                return nameJson.toJSONString();
        }

        @ResponseBody
        @RequestMapping(value = "/1002", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
        public String getPlayerName2(HttpServletRequest request, HttpServletResponse response, String userId, String name) throws IOException {
                // Player player = playerService.getPlayer(Long.valueOf(id));
                JSONObject nameJson = new JSONObject();
                System.out.println(userId);
                System.out.println(name);
                nameJson.put("cmd", "1002");
                nameJson.put("playerId", "20000");
                return nameJson.toJSONString();
        }

}
