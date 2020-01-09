package com.evn.game.db.redisDao;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.data.redis.core.ZSetOperations.TypedTuple;
import org.springframework.stereotype.Service;

import com.evn.game.core.redis.dao.AbstractZSetCDao;

/**
 * 2020年1月8日
 *
 * @author ayue
 */
@Service
public class ScoreRankZSetDao extends AbstractZSetCDao<String> {
        private final static String key = "rank:score";

        public ScoreRankZSetDao() {
                super(String.class);
        }

        private String getKey() {
                return key;
        }

        public void addPlayerScore(String playerOpenId, int score) {
                this.zadd(this.getKey(), playerOpenId, score);
        }

        public int getPlayerScore(String playerOpenId) {
                Double score = this.getScore(this.getKey(), playerOpenId);
                if (score == null) {
                        return 0;
                } else {
                        return (int) (score.doubleValue());
                }
        }

        public int getRank(String playerOpenId) {
                Long rank = this.getDescRank(this.getKey(), playerOpenId);
                if (rank == null) {
                        return -1;
                } else {
                        return rank.intValue() + 1;
                }
        }

        public Map<String, Integer> getPlayerScoreRank(int start, int count) {
                Map<String, Integer> map = new LinkedHashMap<String, Integer>();
                Set<TypedTuple<String>> set = this.zrangeTypedTupleDesc(getKey(), start, start + count);
                if (set != null && set.size() > 0) {
                        for (TypedTuple<String> typedTuple : set) {
                                map.put(typedTuple.getValue(), (int) (typedTuple.getScore().doubleValue()));
                        }
                }
                return map;
        }

        public void deleteRank() {
                this.delete(getKey());
        }
}
