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
 * 2019Äê11ÔÂ21ÈÕ
 *
 * @author ayue
 */
@Controller
@RequestMapping("/cmd")
public class PlayerController {
        private Logger logger = Logger.getLogger(this.getClass());

        @Autowired
        private PlayerService playerService;

        @ResponseBody
        @RequestMapping(value = "/cmdManager", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
        public String getPlayerName(HttpServletRequest request, HttpServletResponse response) throws IOException {
                String id = request.getParameter("protocol");
                // Player player = playerService.getPlayer(Long.valueOf(id));
                System.out.println(id);
                JSONObject nameJson = new JSONObject();
                nameJson.put("playerId", "100100000000000001");
                return "1001-" + nameJson.toJSONString();
        }

}
