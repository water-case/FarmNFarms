
package com.ssafy.domain.auctionDetail;

import com.ssafy.api.dto.AuctionRoomDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuctionDetailRepository extends JpaRepository<AuctionDetail, Long> {
    @Query(value = "select r.id id, " +
            "r.auction_room_title auctionRoomTitle," +
            "r.auction_room_description auctionRoomDescription, " +
            "r.thumbnail_id thumbnailId," +
            "r.owner_id ownerId " +
            "from auction_room r INNER JOIN auction_detail d ON d.AUCTION_ROOM_ID = r.ID where d.product_title like CONCAT('%', :product, '%')" +
            "ORDER BY r.created_At DESC", nativeQuery = true)
    List<AuctionRoomDto> findAllByProduct(@Param("product") String product);

    @Query(value = "select * from auction_detail d where auction_room_id = :id order by id asc", nativeQuery = true)
    List<AuctionDetail> findAllByAuctionRoomIdOrderByIdAsc(@Param("id") Long id);




}

