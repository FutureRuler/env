package com.evn.game.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evn.game.db.redisDao.ScoreRankZSetDao;

/**
 * 2020年1月8日
 *
 * @author ayue
 */
@Service
public class RankService {
        @Autowired
        private ScoreRankZSetDao scoreRankZSetDao;

        public void addPlayerScore(String playerOpenId, int score) {
                scoreRankZSetDao.addPlayerScore(playerOpenId, score);
        }

        public Map<String, Integer> getPlayerScoreRank(int start, int count) {
                return scoreRankZSetDao.getPlayerScoreRank(start, count);
        }

        public int getRank(String playerOpenId) {
                return scoreRankZSetDao.getRank(playerOpenId);
        }

        public int getScore(String playerOpenId) {
                return scoreRankZSetDao.getPlayerScore(playerOpenId);
        }

}
