package com.evn.game.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evn.game.db.dao.PlayerMapper;
import com.evn.game.db.po.Player;

/**
 * 2019Äê11ÔÂ21ÈÕ
 *
 * @author ayue
 */
@Service
public class PlayerService {
        private Logger logger = Logger.getLogger(this.getClass());

        @Autowired
        private PlayerMapper playerMapper;

        public Player getPlayer(long id) {
                return playerMapper.selectByPrimaryKey(id);
        }
}
