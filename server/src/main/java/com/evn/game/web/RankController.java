package com.evn.game.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.evn.game.service.RankService;

/**
 * 2020年1月8日
 *
 * @author ayue
 */
@Controller
@RequestMapping("/rank")
public class RankController {
        @Autowired
        private RankService rankService;

        @ResponseBody
        @RequestMapping(value = "/1001", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
        public String rankAdd(HttpServletRequest request, HttpServletResponse response, String playerOpenId, int score) throws IOException {
                int oldScore = rankService.getRank(playerOpenId);
                if (score > oldScore) {
                        rankService.addPlayerScore(playerOpenId, score);
                }
                JSONObject nameJson = new JSONObject();
                nameJson.put("cmd", "1001");
                return nameJson.toJSONString();
        }
}
